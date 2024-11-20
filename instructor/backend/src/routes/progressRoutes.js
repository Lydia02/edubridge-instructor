import { updateProgress } from '../controllers/progresController.js';

async function progressRoutes(fastify, options) {
  fastify.post('/api/progress', updateProgress);
}

export default progressRoutes;
