document.addEventListener('DOMContentLoaded', loadUserData);
// Function to calculate and update circular progress
function updateProgress(element, percentage) {
    const circle = element.querySelector('circle:last-of-type');
    const radius = 35; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (percentage / 100) * circumference; // Calculate offset for progress
    circle.style.strokeDashoffset = offset; // Apply offset to the circle
}

// Example: Apply progress animation to all circular progress elements
document.querySelectorAll('.circular-progress').forEach((progress, index) => {
    // Simulate percentages for example purposes
    const percentages = [75, 60, 90, 100, 80, 50, 85, 70, 0, 95]; // Adjust these values based on your data
    updateProgress(progress, percentages[index]);
});

async function loadUserData() {
    const usernameElement = document.getElementById('username');
    const coursesContainer = document.getElementById('courses');

    // Fetch user profile
    const profileData = await fetchUserProfile();
    if (profileData) {
        usernameElement.textContent = `${profileData.firstName}!`;
    }

    // Fetch user enrollments
    const enrollmentsData = await fetchUserEnrollments();
    if (enrollmentsData && enrollmentsData.enrollments.length > 0) {
        coursesContainer.innerHTML = '';  // Clear previous entries
        enrollmentsData.enrollments.forEach(enrollment => {
            coursesContainer.innerHTML += `
                <div class="course-item">
                    <h5>${enrollment.course.title}</h5>
                    <p>${enrollment.course.description}</p>
                </div>
            `;
        });
    } else {
        coursesContainer.innerHTML = '<p>You are not enrolled in any courses.</p>';
    }
}

async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token available');
        return;
    }

    try {
        const response = await fetch('http://localhost:3002/api/profile', {  // Adjust the URL as necessary
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}


// async function fetchUserEnrollments() {
//     try {
//         const response = await fetch('/api/enrollments', {
//             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//         });
//         if (!response.ok) throw new Error('Failed to fetch enrollments');
//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
