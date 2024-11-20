// Import Prisma Client instance from a separate file or declare it here
import { prisma } from '../../fastify.js';

export const getCategories = async (req, reply) => {
    try {
        const categories = await prisma.category.findMany(); // Replace `category` with your actual model name
        reply.send(categories);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to fetch categories" });
    }
};
