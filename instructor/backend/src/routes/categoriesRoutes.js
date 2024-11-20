import { getCategories } from '../controllers/categoriesController.js';


async function categoryRoutes(fastify, options) {
    fastify.get('/api/categories', getCategories);
}

export default categoryRoutes;
