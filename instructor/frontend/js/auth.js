document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.querySelector("#signup-form");
    const loginForm = document.querySelector("#login-form");
    const notificationCard = document.querySelector("#notification-card");
    const verificationSection = document.querySelector("#verification-section");
    const signupSection = document.querySelector("#signup-form");

    function showMessage(message, isSuccess = false) {
        if (notificationCard) {
            notificationCard.style.display = "block";
            notificationCard.style.backgroundColor = isSuccess ? "green" : "red";
            notificationCard.textContent = message;

            setTimeout(() => {
                notificationCard.style.display = "none";
            }, 3000);
        }
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            console.log("Signup form submitted");

            const firstName = document.querySelector("#firstname").value.trim();
            const lastName = document.querySelector("#lastname").value.trim();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();
            const role = document.querySelector("#role").value.trim();

            if (!firstName || !lastName || !email || !password || !role) {
                showMessage("Please fill in all fields.");
                return;
            }

            const formData = { firstName, lastName, email, password, role };
            console.log("Sending signup request with data:", formData);

            try {
                const response = await fetch("https://edubridge-instructor.onrender.com/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                console.log("Parsed signup response JSON:", result);

                if (response.ok) {
                    showMessage("Signup successful! Please check your email for the verification code.", true);
                    if (signupSection && verificationSection) {
                        signupSection.style.display = "none";
                        verificationSection.style.display = "block";
                    }
                } else {
                    showMessage(result.message || "Signup failed, please try again.");
                }
            } catch (error) {
                console.error("Error during signup request:", error);
                showMessage("An error occurred. Please try again later.");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();

            try {
                const response = await fetch("https://edubridge-instructor.onrender.com/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", result.token);
                    showMessage("Login successful", true);
                    setTimeout(() => window.location.href = "dashboard.html", 2000);
                } else {
                    showMessage(result.error || "Login failed");
                }
            } catch (error) {
                showMessage("An error occurred during login");
            }
        });
    }

    window.verifyUser = async function verifyUser() {
        const email = document.querySelector("#verification-email").value.trim();
        const code = document.querySelector("#verification-code").value.trim();

        if (!email || !code) {
            showMessage("Please enter both email and verification code.");
            return;
        }

        try {
            const response = await fetch("https://edubridge-instructor.onrender.com/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const result = await response.json();
            if (response.ok) {
                showMessage("Verification successful!", true);
                setTimeout(() => window.location.href = "login.html", 2000);
            } else {
                showMessage(result.error || "Verification failed.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            showMessage("An error occurred during verification.");
        }
    };
});
