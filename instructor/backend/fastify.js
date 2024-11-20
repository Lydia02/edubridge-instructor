import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fs from 'fs';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the `uploads/profile-pictures` directory exists
const uploadDir = path.join(__dirname, 'uploads/profile-pictures');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/', // Files will be accessible at /uploads/...
});

fastify.register(fastifyMultipart, {
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});


// Error handling middleware
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  const statusCode = error.statusCode || 500;
  reply.status(statusCode).send({
    error: {
      message: error.message || "Internal Server Error",
      statusCode,
    },
  });
});
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Disconnect Prisma on server close
fastify.addHook("onClose", async (instance, done) => {
  await prisma.$disconnect();
  done();
});

// Start server function
export const startServer = async () => {
  try {
    const port = process.env.PORT || 3002; // Use Render's PORT or default to 3002
    await fastify.listen({ port, host: "0.0.0.0" }); // Bind to 0.0.0.0
    fastify.log.info(`Server running at http://0.0.0.0:${port}/`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  
};

startServer();

export { fastify, prisma };
