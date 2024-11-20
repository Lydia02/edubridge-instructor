// Import Prisma Client instance from a separate file or declare it here
import { prisma } from '../../fastify.js';


// Fetch all courses
export const getCourses = async (req, reply) => {
  try {
    const courses = await prisma.course.findMany({ include: { category: true } });
    reply.send(courses);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Failed to fetch courses" });
  }
};

export const createCourse = async (req, reply) => {
  const { title, description, price, categoryId, imageUrl, introduction, lectures, enrolledStudents, duration, instructor, instructorImage, level, syllabusOutline } = req.body;

  try {
      // Check if category exists
      const categoryExists = await prisma.category.findUnique({
          where: { id: parseInt(categoryId) }
      });

      if (!categoryExists) {
          return reply.status(400).send({ error: "Invalid categoryId. Category does not exist." });
      }

      // Create the course
      const course = await prisma.course.create({
          data: {
              title,
              description,
              price,
              categoryId: parseInt(categoryId),
              imageUrl,
              introduction,
              lectures,
              enrolledStudents,
              duration,
              instructor,
              instructorImage,
              level,
              syllabusOutline
          }
      });

      reply.send(course);
  } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Failed to create course" });
  }
};


// Update a course
export const updateCourse = async (req, reply) => {
  const { id } = req.params;
  const { title, description, price, categoryId, imageUrl, introduction, lectures, enrollledStudent, duration, instructor, instructorImage, level, syllabusOutline } = req.body;

  try {
    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: { title, description, price, categoryId, imageUrl, introduction, lectures, enrollledStudent, duration, instructor, instructorImage, level, syllabusOutline } 
    });
    reply.send(course);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Failed to update course" });
  }
};

// Delete a course
export const deleteCourse = async (req, reply) => {
  const { id } = req.params;
  try {
    await prisma.course.delete({
      where: { id: Number(id) }
    });
    reply.send({ message: 'Course deleted successfully' });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Failed to delete course" });
  }
};
