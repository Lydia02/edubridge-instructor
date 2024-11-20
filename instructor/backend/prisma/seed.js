import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function main() {
    // Seed categories
    const categories = [
      { name: 'Web Development', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
      { name: 'Data Science', imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
      { name: 'Programming Languages', imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
      { name: 'Cloud Computing', imageUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  ];
  
    console.log('Seeding categories...');
    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }

    
// Continued from seeding courses...
console.log('Seeding students...');

const students = [
    { firstName: 'Lydia', lastName: 'Ojoawo', email: 'ojoawolydia@gmail.com', password: await hashPassword('password1'), role: 'student', courses: [{ courseId: 1, progress: 100 }] },
    { firstName: 'Lydia', lastName: 'Ojoawo', email: 'lydiaojoawo11@gmail.com', password: await hashPassword('password2'), role: 'student', courses: [{ courseId: 2, progress: 50 }] },
    { firstName: 'Adeyemi', lastName: 'Kolade', email: 'yemolee@gmail.com', password: await hashPassword('password3'), role: 'student', courses: [{ courseId: 3, progress: 100 }] },
    { firstName: 'David', lastName: 'Joyce', email: 'djoyce@gmail.com', password: await hashPassword('password4'), role: 'student', courses: [{ courseId: 4, progress: 75 }] },
    { firstName: 'Eva', lastName: 'Brown', email: 'evabrown@gmail.com', password: await hashPassword('password5'), role: 'student', courses: [{ courseId: 5, progress: 25 }] },

];

for (const student of students) {
  const existingUser = await prisma.user.findUnique({
      where: { email: student.email },
  });

  let user;
  if (!existingUser) {
      user = await prisma.user.create({
          data: {
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email,
              password: student.password,
              role: student.role,
          },
      });
  } else {
      user = existingUser;
  }

  // Continue with the rest of your script for enrollments and certificates
}


console.log('All data seeded successfully!');



    // Seed courses
    
    const courses = [
      {
          title: "Intro to HTML",
          description: "Learn the basics of HTML and web development.",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          price: 0,
          categoryId: 1,
          instructor: "John Doe",
          duration: "2 weeks",
          level: "Beginner",
          lectures: 10,
          students:1,
          enrolledStudents: 0,
          introduction: "This course introduces you to the foundational elements of HTML, teaching you how to structure pages and create interactive elements.",
          instructorImage: "https://randomuser.me/api/portraits/men/32.jpg",
          syllabusOutline: JSON.stringify({ Introduction: "Learn HTML tags and structure.", Advanced: "Forms and new HTML5 elements." })
      },
      {
          title: "Advanced CSS",
          description: "Master complex CSS techniques including flexbox and grid.",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          price: 100,
          categoryId: 1,
          instructor: "John Doe",
          duration: "3 weeks",
          level: "Intermediate",
          lectures: 15,
          students:1,
          enrolledStudents: 0,
          introduction: "This course covers advanced CSS concepts, including flexbox, grid, and responsive design.",
          instructorImage: "https://randomuser.me/api/portraits/men/32.jpg",
          syllabusOutline: JSON.stringify({ Introduction: "CSS selectors and properties.", Advanced: "Responsive design and animations." })
      },
      {
          title: "JavaScript Essentials",
          description: "Explore JavaScript syntax and fundamentals.",
          imageUrl: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
          price: 50,
          categoryId: 1,
          instructor: "Alice Johnson",
          duration: "4 weeks",
          level: "Beginner",
          lectures: 20,
          students:1,
          enrolledStudents: 0,
          introduction: "This course covers the basics of JavaScript, including variables, loops, and functions.",
          instructorImage: "https://randomuser.me/api/portraits/women/44.jpg",
          syllabusOutline: JSON.stringify({ Basics: "Variables, loops, and conditions.", Advanced: "DOM manipulation and event handling." })
      },
      {
          title: "Python for Data Science",
          description: "Learn Python programming and its applications in data science.",
          imageUrl: "https://images.unsplash.com/photo-1550647516-77c93b47c3c1",
          price: 200,
          categoryId: 2,
          instructor: "Eve Polastri",
          duration: "6 weeks",
          level: "Beginner",
          lectures: 25,
          students:1,
          enrolledStudents: 0,
          introduction: "This course introduces you to Python programming and its applications in data science.",
          instructorImage: "https://randomuser.me/api/portraits/women/50.jpg",
          syllabusOutline: JSON.stringify({ Introduction: "Python basics, data structures.", Advanced: "Pandas and NumPy for data analysis." })
      },
      {
          title: "Deep Learning with TensorFlow",
          description: "Dive into deep learning concepts with TensorFlow.",
          imageUrl: "https://images.unsplash.com/photo-1579154204709-c2eb33eb58de",
          price: 300,
          categoryId: 2,
          instructor: "David Smith",
          duration: "8 weeks",
          level: "Advanced",
          students:1,
          lectures: 30,
          enrolledStudents: 0,
          introduction: "This course covers deep learning concepts using TensorFlow, including neural networks and model building.",
          instructorImage: "https://randomuser.me/api/portraits/men/85.jpg",
          syllabusOutline: JSON.stringify({ Fundamentals: "Neural networks basics.", Applications: "Building models for image and text recognition." })
      },
      {
          title: "Full-Stack Web Development",
          description: "Become a full-stack web developer.",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          price: 400,
          categoryId: 1,
          instructor: "Mark Zulu",
          duration: "12 weeks",
          level: "Advanced",
          students:1,
          lectures: 40,
          enrolledStudents: 0,
          introduction: "This course covers both frontend and backend development, including databases and deployment.",
          instructorImage: "https://randomuser.me/api/portraits/men/46.jpg",
          syllabusOutline: JSON.stringify({ Frontend: "HTML, CSS, JavaScript.", Backend: "Node.js, Express, and MongoDB." })
      },
      {
          title: "Cloud Architecture with AWS",
          description: "Learn to design and deploy scalable systems on AWS.",
          imageUrl: "https://images.unsplash.com/photo-1554130624-b9a543d5156b",
          price: 350,
          categoryId: 4,
          instructor: "Lara Croft",
          duration: "5 weeks",
          level: "Intermediate",
          students:1,
          lectures: 15,
          introduction: "This course covers cloud architecture principles and best practices using AWS.",
          enrolledStudents: 0,
          instructorImage: "https://randomuser.me/api/portraits/women/77.jpg",
          syllabusOutline: JSON.stringify({ Basics: "AWS fundamentals and core services.", Advanced: "Building secure and scalable architectures." })
      },
      {
          title: "Advanced Database Systems",
          description: "Master advanced concepts in database systems.",
          imageUrl: "https://images.unsplash.com/photo-1581091012184-d2058a36e8d6",
          price: 150,
          categoryId: 3,
          instructor: "Mohamed Ali",
          students:1,
          duration: "7 weeks",
          level: "Advanced",
          lectures: 21,
          introduction: "This course covers advanced database concepts, including performance tuning and optimization.",
          enrolledStudents: 0,
          instructorImage: "https://randomuser.me/api/portraits/men/52.jpg",
          syllabusOutline: JSON.stringify({ Introduction: "SQL and NoSQL databases.", Advanced: "Performance tuning and optimization." })
      },
      {
          title: "Cybersecurity Fundamentals",
          description: "Understand the basics of cybersecurity.",
          imageUrl: "https://images.unsplash.com/photo-1534723452862-4c874018d66d",
          price: 0,
          categoryId: 4,
          instructor: "Sara Connor",
          duration: "9 weeks",
          level: "Beginner",
          students:1,
          lectures: 18,
          enrolledStudents: 0,
          introduction: "This course covers the fundamentals of cybersecurity, including security principles and threats.",
          instructorImage: "https://randomuser.me/api/portraits/women/18.jpg",
          syllabusOutline: JSON.stringify({ Core_Concepts: "Security principles, threats, and vulnerabilities.", Applied: "Practical approaches to security." })
      },
      {
          title: "Machine Learning with R",
          description: "Explore machine learning techniques using R.",
          imageUrl: "https://images.unsplash.com/photo-1581092795361-dfe3df5105f1",
          price: 250,
          categoryId: 2,
          instructor: "Robert Langdon",
          duration: "10 weeks",
          level: "Intermediate",
          students:1,
          lectures: 25,
          enrolledStudents: 0,
          introduction: "This course covers machine learning algorithms and their implementation using R.",
          instructorImage: "https://randomuser.me/api/portraits/men/34.jpg",
          syllabusOutline: JSON.stringify({ Basics: "Data manipulation with R.", Advanced: "Machine learning algorithms and their implementation." })
      }
  ];


    console.log('Seeding courses...');
    for (const course of courses) {
        await prisma.course.create({
            data: course,
        });
    }
}



main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
