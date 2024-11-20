import { prisma } from '../../fastify.js';

export const updateProgress = async (req, reply) => {
    const { userId, courseId, progressPercentage } = req.body;

    try {
        // Check if there's existing progress entry
        let progress = await prisma.progress.findUnique({
            where: {
                userId_courseId: { userId, courseId }
            }
        });

        if (progress) {
            // Update existing progress
            progress = await prisma.progress.update({
                where: {
                    id: progress.id
                },
                data: {
                    progress: progressPercentage
                }
            });
        } else {
            // Create new progress entry
            progress = await prisma.progress.create({
                data: {
                    userId,
                    courseId,
                    progress: progressPercentage
                }
            });
        }

        // Issue certificate if progress is 100%
        if (progressPercentage === 100) {
            const certificate = await prisma.certificate.create({
                data: {
                    userId,
                    courseId,
                    issuedAt: new Date()
                }
            });
            reply.send({ progress, certificate });
        } else {
            reply.send({ progress });
        }
    } catch (error) {
        console.log(error);
        reply.status(500).send({ error: "Failed to update progress or issue certificate" });
    }
};