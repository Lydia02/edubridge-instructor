import {
  registerUser,
  loginUser,
  blacklistToken,
} from "../services/authService.js";
import { userSchema } from "../models/userSchema.js";
import { UnauthorizedError, BadRequestError } from "../utils/errors.js";
import { z } from "zod";
import { transporter } from "../config/email.js"; 
import { prisma } from '../../fastify.js';


export async function register(request, reply) {
  const { firstName, lastName, email, password, role } = request.body;

  try {
    const parsedData = userSchema.parse({ firstName, lastName, email, password });
    await registerUser(parsedData.firstName, parsedData.lastName, parsedData.email, parsedData.password, role);

    return reply.code(201).send({ message: "Registration successful! Please check your email for the verification code." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

export async function login(request, reply) {
  const { email, password } = request.body;

  try {
    const user = await loginUser(email, password);

    if (!user.isVerified) {
      console.log("User is not verified:", email); // Debuhgjgging log
      return reply.status(403).send({ error: "Please verify your email to log in." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    const token = await reply.jwtSign({ id: user.id, role: user.role });
    return reply.send({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({ error: error.message });
    }
    console.error("Login error:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

export async function logout(request, reply) {
  const token = request.headers.authorization.split(" ")[1];
  blacklistToken(token);

  return reply.code(200).send({
    message: "Logout successful",
  });
}

export async function verify(request, reply) {
  const { email, code } = request.body;
  
  if (!email || !code) {
    return reply.status(400).send({ error: "Email and code are required" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("User not found for email:", email); // Debugging log
      throw new BadRequestError("User not found");
    }

    if (user.isVerified) {
      throw new BadRequestError("User is already verified");
    }

    if (user.verificationCode !== code) {
      console.log("Invalid verification code for user:", email); // Debugging log
      throw new BadRequestError("Invalid verification code");
    }

    await prisma.user.update({
      where: { email },
      data: { isVerified: true, verificationCode: null },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to EduBridge!",
      text: `Hello ${user.firstName},\n\nWelcome to EduBridge! Your account has been verified.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);

    return reply.send({ message: "Verification successful. You can now log in." });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ error: error.message });
    }
    console.error("Verification error:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
