document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    // Function to show notifications
    function showNotification(type, message) {
        const notification = document.createElement("div");
        notification.className = type === "success" ? "alert alert-success" : "alert alert-danger";
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Fetch user profile data
    fetch('https://edubridge-instructor.onrender.com/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch profile");
            return response.json();
        })
        .then(data => {
            document.getElementById("firstNameDisplay").value = data.firstName;
            document.getElementById("lastNameDisplay").value = data.lastName;
            document.getElementById("emailDisplay").value = data.email;
            document.getElementById("roleDisplay").value = data.role;
            // document.getElementById("profilePicturePreview").src = data.profilePicture || "instructor/frontend/img/about.jpg";
        })
        .catch(error => showNotification("error", "Failed to load profile"));

    // Handle Edit Profile button
    document.getElementById("editBtn").addEventListener("click", function () {
        document.getElementById("profile-info").style.display = "none";
        document.getElementById("profile-form").style.display = "block";
        document.getElementById("firstName").value = document.getElementById("firstNameDisplay").value;
        document.getElementById("lastName").value = document.getElementById("lastNameDisplay").value;
    });

    // Handle Save Changes button
    document.getElementById("profile-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;

        fetch('https://edubridge-instructor.onrender.com/api/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ firstName, lastName })
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to update profile");
                return response.json();
            })
            .then(data => {
                showNotification("success", "Profile updated successfully");
                document.getElementById("firstNameDisplay").value = data.firstName;
                document.getElementById("lastNameDisplay").value = data.lastName;
                document.getElementById("profile-form").style.display = "none";
                document.getElementById("profile-info").style.display = "block";
            })
            .catch(error => showNotification("error", "Failed to update profile"));
    });

    // Handle Cancel button
    document.getElementById("cancelEdit").addEventListener("click", function () {
        document.getElementById("profile-form").style.display = "none";
        document.getElementById("profile-info").style.display = "block";
    });

    // Handle Change Password button
    document.getElementById("changePasswordBtn").addEventListener("click", function () {
        const modal = new bootstrap.Modal(document.getElementById("changePasswordModal"));
        modal.show();
    });

    // Handle Change Password form submission
    document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;

        fetch('https://edubridge-instructor.onrender.com/api/profile/change-password', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to change password");
                return response.json();
            })
            .then(() => {
                showNotification("success", "Password changed successfully");
                const modal = bootstrap.Modal.getInstance(document.getElementById("changePasswordModal"));
                modal.hide();
            })
            .catch(error => showNotification("error", "Failed to change password"));
    });
});
