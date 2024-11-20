// Hardcoded course data
const courses = [
    {
        id: 1,
        title: "HTML Course for Beginners",
        description: "Start at the beginning by learning HTML basics — an important foundation for building and editing web pages.",
        imageUrl: "img/course-1.jpg",
        price: 0,
        instructor: "Zoe Bachman",
        instructorImage: "img/testimonial-2.jpg",
        duration: 2,
        level: "Beginner",
        lectures: 4,
        enrolledStudents: "5.8L+",
    },
    {
        id: 2,
        title: "Front End Development - CSS",
        description: "Master CSS and become proficient in styling web pages.",
        imageUrl: "img/course-2.jpg",
        price: 199,
        instructor: "John Doe",
        instructorImage: "img/instructor-1.jpg",
        duration: 4,
        level: "Intermediate",
        lectures: 10,
        enrolledStudents: "3.5L+",
    },
    {
        id: 3,
        title: "Introduction to JavaScript",
        description: "Learn JavaScript, the programming language of the web, and add dynamic content to your websites.",
        imageUrl: "img/course-3.jpg",
        price: 0,
        instructor: "Jane Smith",
        instructorImage: "img/instructor-2.jpg",
        duration: 3,
        level: "Beginner",
        lectures: 6,
        enrolledStudents: "7.6L+",
    },
    {
        id: 4,
        title: "Python Programming",
        description: "Learn the fundamentals of Python programming with real-world examples and practice exercises.",
        imageUrl: "img/course-4.jpg",
        price: 299,
        instructor: "Emily Davis",
        instructorImage: "img/instructor-3.jpg",
        duration: 5,
        level: "Beginner",
        lectures: 8,
        enrolledStudents: "3.3L+",
    },
    {
        id: 5,
        title: "SQL for Data Science",
        description: "Learn SQL to manage and analyze data for data science applications.",
        imageUrl: "img/course-5.jpg",
        price: 0,
        instructor: "Mark Thompson",
        instructorImage: "img/instructor-4.jpg",
        duration: 5,
        level: "Intermediate",
        lectures: 9,
        enrolledStudents: "1.3L+",
    },
    {
        id: 6,
        title: "ChatGPT for Beginners",
        description: "Discover how to use ChatGPT for different tasks and get started with AI-powered conversational agents.",
        imageUrl: "img/course-6.jpg",
        price: 0,
        instructor: "Alice Brown",
        instructorImage: "img/instructor-5.jpg",
        duration: 4.5,
        level: "Beginner",
        lectures: 5,
        enrolledStudents: "3.5L+",
    },
    {
        id: 7,
        title: "AWS for Beginners",
        description: "Get started with Amazon Web Services (AWS) and learn cloud fundamentals.",
        imageUrl: "img/course-7.jpg",
        price: 0,
        instructor: "Robert Lee",
        instructorImage: "img/instructor-6.jpg",
        duration: 3,
        level: "Beginner",
        lectures: 7,
        enrolledStudents: "1.0L+",
    },
    {
        id: 8,
        title: "Microsoft Azure Essentials",
        description: "Learn Microsoft Azure essentials to get started with cloud computing.",
        imageUrl: "img/course-8.jpg",
        price: 149,
        instructor: "Sarah Johnson",
        instructorImage: "img/instructor-7.jpg",
        duration: 3.5,
        level: "Intermediate",
        lectures: 6,
        enrolledStudents: "4.4L+",
    },
    {
        id: 9,
        title: "Introduction to MS Excel",
        description: "Master the basics of Microsoft Excel for data analysis and management.",
        imageUrl: "img/course-9.jpg",
        price: 0,
        instructor: "David White",
        instructorImage: "img/instructor-8.jpg",
        duration: 3.5,
        level: "Beginner",
        lectures: 6,
        enrolledStudents: "4.2L+",
    },
    {
        id: 10,
        title: "C for Beginners",
        description: "Learn C programming fundamentals for developing efficient applications.",
        imageUrl: "img/course-10.jpg",
        price: 0,
        instructor: "Michael Green",
        instructorImage: "img/instructor-9.jpg",
        duration: 1.5,
        level: "Beginner",
        lectures: 3,
        enrolledStudents: "1.1L+",
    },
    {
        id: 11,
        title: "Statistics for Data Science",
        description: "Learn the essential statistical techniques required for data science and how to apply them to analyze data.",
        imageUrl: "img/course-11.jpg",
        price: 299,
        instructor: "Emma Williams",
        instructorImage: "img/instructor-10.jpg",
        duration: 2.5,
        level: "Intermediate",
        lectures: 5,
        enrolledStudents: "5.3L+"
    },
    {
        id: 12,
        title: "Java Programming",
        description: "Master the basics of Java programming and build a solid foundation for software development.",
        imageUrl: "img/course-12.jpg",
        price: 0,
        instructor: "Michael Johnson",
        instructorImage: "img/instructor-11.jpg",
        duration: 2,
        level: "Beginner",
        lectures: 6,
        enrolledStudents: "5L+"
    }
];

// Utility function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load course data based on the URL's course ID
document.addEventListener('DOMContentLoaded', async function () {
    const courseId = getUrlParameter('id');

    try {
        // Fetch course details from the backend
        const response = await fetch(`https://edubridge-instructor.onrender.com/api/courses/${courseId}`);
        if (!response.ok) {
            throw new Error("Course not found");
        }
        const course = await response.json();

        // Populate course data in the HTML
        document.getElementById('course-title').textContent = course.title;
        document.getElementById('breadcrumb-title').textContent = course.title;
        document.getElementById('course-description-title').textContent = course.title;
        document.getElementById('course-description').textContent = course.description;
        document.getElementById('course-duration').textContent = `${course.duration} Hrs`;
        document.getElementById('course-level').textContent = course.level;
        document.getElementById('enrolled-students').textContent = course.enrolledStudents;
        document.getElementById('course-image').src = course.imageUrl;
        document.getElementById('instructor-name').textContent = course.instructor;
        document.getElementById('instructor-image').src = course.instructorImage;
        document.getElementById('course-price').textContent = course.price === 0 ? "Free" : `₹${course.price}`;
        document.getElementById('course-rating').textContent = course.rating || "4.5"; // Fallback rating

        // Check if user is already enrolled
        await updateEnrollmentButton(course.id);

        // Set up enroll/unenroll button click event
        const enrollButton = document.getElementById('enroll-button');
        enrollButton.addEventListener('click', async function (e) {
            e.preventDefault();
            await enrollInCourse(course.id);
        });
    } catch (error) {
        console.error("Error loading course:", error);
        document.getElementById('course-title').textContent = "Course Not Found";
    }
});

function showNotification(type, message) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    // Set notification style based on success or error
    notification.style.backgroundColor = type === "success" ? "rgba(0, 123, 255, 0.8)" : "rgba(220, 53, 69, 0.8)";
    notificationMessage.innerText = message;
    notification.style.display = "flex"; // Show the notification card
}


// Function to check and update the enrollment button state
async function updateEnrollmentButton(courseId) {
    try {
        const response = await fetch('https://edubridge-instructor.onrender.com/api/enrollments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch enrollment status');
        }

        const data = await response.json();
        const isEnrolled = data.enrollments.some(enrollment => enrollment.courseId === courseId);
        const enrollButton = document.getElementById('enroll-button');

        if (isEnrolled) {
            enrollButton.textContent = 'Enrolled';
            enrollButton.classList.add('enrolled');
            enrollButton.setAttribute('data-enrolled', 'true');
        } else {
            enrollButton.textContent = 'Enroll Now';
            enrollButton.classList.remove('enrolled');
            enrollButton.setAttribute('data-enrolled', 'false');
        }
    } catch (error) {
        console.error("Error checking enrollment status:", error);
    }
}


// Notification display function with default message
function showNotification(type = "info", message = "Notification") {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    // Set notification style and message
    notification.className = type === "success" ? "notification-card alert alert-success" : "notification-card alert alert-danger";
    notificationMessage.innerText = message;
    notification.style.display = "flex"; // Show the notification card in the center
}

// Dismiss notification function
function dismissNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "none";
}


// Function to handle enrollment and prevent duplicate enrollments
async function enrollInCourse(courseId) {
    const isAlreadyEnrolled = document.getElementById('enroll-button').getAttribute('data-enrolled') === 'true';

    if (isAlreadyEnrolled) {
        showNotification("You are already enrolled in this course.");
        return;
    }

    try {
        const response = await fetch('https://edubridge-instructor.onrender.com/api/enroll', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to enroll');
        }

        showNotification("You are now enrolled in this course!");
        await updateEnrollmentButton(courseId);
    } catch (error) {
        console.error("Error during enrollment:", error);
        showNotification(`Failed to enroll: ${error.message}`);
    }
    document.addEventListener('DOMContentLoaded', async function () {
    const courseId = new URLSearchParams(window.location.search).get('id');
    if (!courseId) return console.error("Course ID not found");

    try {
        const response = await fetch(`https://edubridge-instructor.onrender.com/api/courses/${courseId}`);
        if (!response.ok) throw new Error("Course not found");

        const course = await response.json();
        document.getElementById('course-title').textContent = course.title;
        document.getElementById('course-description').textContent = course.description;

        const enrollButton = document.getElementById('enroll-button');
        enrollButton.addEventListener('click', async function (e) {
            e.preventDefault();
            const token = getToken();
            if (!token) return showNotification("Please log in");

            try {
                const enrollResponse = await fetch('https://edubridge-instructor.onrender.com/api/enroll', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseId: parseInt(courseId) })
                });

                if (!enrollResponse.ok) throw new Error("Failed to enroll");
                showNotification("Successfully enrolled!");
            } catch (error) {
                console.error("Enrollment error:", error);
            }
        });
    } catch (error) {
        document.getElementById('course-title').textContent = "Course Not Found";
    }
});

}
