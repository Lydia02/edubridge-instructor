document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    loadCategories();
});

async function loadCourses() {
    try {
        const response = await fetch('https://edubridge-instructor.onrender.com/api/courses');
        if (!response.ok) throw new Error(`Failed to fetch courses: ${response.statusText}`);
        const courses = await response.json();

        const courseList = document.getElementById('course-list');
        courseList.innerHTML = courses.map(course => `
            <tr>
                <td>${course.title}</td>
                <td>${course.description}</td>
                <td>$${course.price}</td>
                <td>${course.instructor}</td>
                <td>${course.duration}</td>
                <td>${course.level}</td>
                <td>
                    <button class="btn btn-warning" onclick="openCourseModal(${course.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCourse(${course.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch('https://edubridge-instructor.onrender.com/api/categories'); // Adjust API endpoint
        if (!response.ok) throw new Error(`Failed to fetch categories: ${response.statusText}`);
        const categories = await response.json();

        const categoryDropdown = document.getElementById('categoryId');
        categoryDropdown.innerHTML = categories.map(category => `
            <option value="${category.id}">${category.name}</option>
        `).join('');
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
}

function openCourseModal(id = null) {
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    document.getElementById('courseForm').reset();
    document.getElementById('modalTitle').innerText = id ? 'Edit Course' : 'Add Course';

    if (id) {
        fetch(`https://edubridge-instructor.onrender.com/api/courses/${id}`)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch course: ${response.statusText}`);
                return response.json();
            })
            .then(course => {
                document.getElementById('courseId').value = course.id;
                document.getElementById('title').value = course.title;
                document.getElementById('description').value = course.description;
                document.getElementById('imageUrl').value = course.imageUrl;
                document.getElementById('price').value = course.price;
                document.getElementById('categoryId').value = course.categoryId;
                document.getElementById('instructor').value = course.instructor;
                document.getElementById('duration').value = course.duration;
                document.getElementById('level').value = course.level;
                document.getElementById('lectures').value = course.lectures;
                document.getElementById('enrolledStudents').value = course.enrolledStudents;
                document.getElementById('instructorImage').value = course.instructorImage;
                document.getElementById('students').value=course.students;
            })
            .catch(error => console.error('Error fetching course:', error));
    }

    modal.show();
}

document.getElementById('courseForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('courseId').value;
    const courseData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: parseFloat(document.getElementById('price').value),
        categoryId: parseInt(document.getElementById('categoryId').value),
        instructor: document.getElementById('instructor').value,
        duration: document.getElementById('duration').value,
        level: document.getElementById('level').value,
        lectures: parseInt(document.getElementById('lectures').value),
        enrolledStudents: parseInt(document.getElementById('enrolledStudents').value),
        instructorImage: document.getElementById('instructorImage').value,
        students: parseInt(document.getElementById('students').value)

    };

    const url = id ? `https://edubridge-instructor.onrender.com/api/courses/${id}` : 'https://edubridge-instructor.onrender.com/api/courses';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) throw new Error('Failed to save course');

        // Hide modal and reload courses
        $('#courseModal').modal('hide');
        loadCourses();
    } catch (error) {
        console.error('Error saving course:', error);
    }
});

async function deleteCourse(id) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
        const response = await fetch(`https://edubridge-instructor.onrender.com/api/courses/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete course: ${response.statusText}`);
        loadCourses();
    } catch (error) {
        console.error('Error deleting course:', error);
    }
}
