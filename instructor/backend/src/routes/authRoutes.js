import { register, login, logout, verify } from "../controllers/authController.js";

export async function authRoutes(fastify, options) {
  fastify.post("/signup", {
    schema: {
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password", "role"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          role: { type: "string", enum: ['user', 'instructor', 'admin'] }, // Ensure role is validated
        },
      },
    },
    handler: register,
  });

  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: login,
  });

  fastify.post("/logout", {
    preValidation: [fastify.authenticate], // Ensure this middleware is properly defined to check token validity
    handler: logout,
  });

  fastify.post("/verify", {
    schema: {
      body: {
        type: "object",
        required: ["email", "code"],
        properties: {
          email: { type: "string" },
          code: { type: "string" },
        },
      },
    },
    handler: verify,
  });
}

export default authRoutes;
