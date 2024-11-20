import { getUserProfile, updateUserProfile, changePassword,uploadProfilePicture } from '../controllers/profileController.js';

export default async function userRoutes(fastify, options) {
    fastify.get('/api/profile', { preValidation: [fastify.authenticate] }, getUserProfile);
    fastify.post('/api/profile/change-password', { preValidation: [fastify.authenticate] }, changePassword);
    fastify.put('/api/profile', {
        preValidation: [fastify.authenticate]
    }, updateUserProfile);
    fastify.post('/api/profile/picture', { 
        preValidation: [fastify.authenticate] 
    }, uploadProfilePicture);
}
