import "dotenv/config";
import { fastify, startServer, prisma } from "./fastify.js";
import jwtPlugin from "./src/config/jwt.js";
import fastifyCors from '@fastify/cors';
import authRoutes from "./src/routes/authRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import progressRoutes from "./src/routes/progressRoutes.js";
import getUserProfile from "./src/routes/userRoutes.js";
import getCategories from "./src/routes/categoriesRoutes.js";

fastify.register(fastifyCors, {
  origin: ["http://localhost:3001", "http://127.0.0.1:5500", "https://edubridge-instructor.onrender.com/"], // Allow all origins, or you can specify your frontend URL like 'http://127.0.0.1:5500'
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers needed for authentication
  credentials: true // Allow credentials (i.e., cookies, authorization headers)

});

fastify.register(jwtPlugin);


fastify.register(authRoutes);
fastify.register(courseRoutes);
fastify.register(progressRoutes);
fastify.register(getUserProfile);
fastify.register(getCategories);

fastify.get("/", async (request, reply) => {
  return { message: "Welcome to Edubridge" };
});

startServer();
