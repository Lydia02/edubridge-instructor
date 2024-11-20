import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

async function courseRoutes(fastify, options) {
  fastify.get('/api/courses', getCourses);
  fastify.post('/api/courses', createCourse);
  fastify.put('/api/courses/:id', updateCourse);
  fastify.delete('/api/courses/:id', deleteCourse);
}

export default courseRoutes;
