import bcrypt from 'bcrypt';
import { prisma } from '../../fastify.js';
import fs from "fs";
import path from "path";

export const getUserProfile = async (req, reply) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { firstName: true, lastName: true, email: true, role: true }
        });

        if (!user) return reply.status(404).send({ message: 'User not found' });

        reply.send(user);
    } catch (error) {
        reply.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateUserProfile = async (req, reply) => {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { firstName, lastName },
            select: { firstName: true, lastName: true, email: true, role: true }
        });

        reply.send(updatedUser);
    } catch (error) {
        reply.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

export const changePassword = async (req, reply) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return reply.status(404).send({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return reply.status(400).send({ message: 'Incorrect password' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });

        reply.send({ message: 'Password changed successfully' });
    } catch (error) {
        reply.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};


export const uploadProfilePicture = async (req, reply) => {
    try {
        const file = await req.file();
        if (!file) {
            return reply.status(400).send({ message: "No file uploaded" });
        }

        const uploadPath = path.join("uploads/profile-pictures", `${req.user.id}-${file.filename}`);
        const savePath = path.resolve(uploadPath);
        await file.toBuffer();
        file.file.pipe(fs.createWriteStream(savePath));

        // Update the database with the new profile picture URL
        const profilePictureUrl = `/uploads/profile-pictures/${req.user.id}-${file.filename}`;
        await prisma.user.update({
            where: { id: req.user.id },
            data: { profilePicture: profilePictureUrl },
        });

        reply.send({ profilePicture: profilePictureUrl });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        reply.status(500).send({ message: "Error uploading profile picture", error: error.message });
    }
};
