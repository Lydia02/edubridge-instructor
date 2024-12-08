# EduBridge Instructor Platform

echo "Trigger GitHub Actions" >> README.md


## Link to the USER Application
[EduBridge User Website](https://edubridge-project.netlify.app/)
---

## Link to the  INSTRUCTOR Application

[EduBridge Instructor Website](https://edubridge-instructor.netlify.app/)
---

## Link to the  USER Github-repo

[EduBridge USER Repo](https://github.com/Lydia02/edubridge)
---

## Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Repository Structure](#repository-structure)  
7. [Usage](#usage)  
8. [API Endpoints](#api-endpoints)  
    - [Authentication](#authentication)  
    - [Course Management](#course-management)  
    - [Progress Tracking](#progress-tracking)  
9. [Testing](#testing)  
10. [CI/CD Pipeline](#ci-cd-pipeline)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contributors](#contributors)  

---

## Overview
**EduBridge Instructor Platform** is an advanced web application designed to provide a seamless online learning environment. It bridges the gap between learners and instructors by offering a suite of tools for course management, progress tracking, and user authentication. The platform ensures secure communication and smooth interaction for all users while empowering instructors to manage educational resources efficiently.

---

## Features
- **Secure Authentication**: User registration, login, and email verification using JWT and secure hashing algorithms.  
- **Course Management**: Add, update, and manage courses, categories, and lessons.  
- **Progress Tracking**: Track learner progress with detailed metrics.  
- **Admin Dashboard**: Manage users, view system analytics, and generate reports.  
- **Responsive Design**: Fully functional across all devices for an optimal user experience.  

---

## Tech Stack
### **Backend**
- **Fastify**: Fast and low-overhead web framework for Node.js.  
- **Prisma ORM**: Database access and schema management with PostgreSQL.  
- **PostgreSQL**: A robust and scalable relational database.  
- **Bcrypt.js**: Secure password hashing for authentication.  
- **JSON Web Tokens (JWT)**: Token-based authentication for user sessions.  
- **Nodemailer**: Sending verification and notification emails.  

### **Frontend**
- **HTML5 & CSS3**: Structuring and styling the web pages.  
- **JavaScript (ES6)**: Adding interactivity and connecting to backend APIs.  
- **Bootstrap**: Responsive and visually appealing design components.  

### **Deployment Tools**
- **Render**: Hosting the backend services with database integration.  
- **Netlify**: Deploying the frontend with continuous integration and delivery.  

### **Version Control**
- **Git & GitHub**: Source code management and collaboration.  

---

## Prerequisites
- **Node.js** (v16 or higher)  
- **PostgreSQL** (or any compatible database for Prisma)  
- A code editor (e.g., VS Code) and Postman for testing APIs.

---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Lydia02/EduBridge-Instructor.git
cd EduBridge-Instructor
```

### Backend Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file:
   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-password"
   PORT=3002
   ```
4. Apply database migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. (Optional) Seed the database:
   ```bash
   node prisma/seed.js
   ```

### Frontend Installation
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```

---

## Repository Structure
```
EduBridge-Instructor/
├── backend/
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/ # Controllers for API logic
│   │   ├── routes/      # API route handlers
│   │   ├── services/    # Core business logic
│   │   ├── utils/       # Utility functions and custom error handling
│   │   ├── config/      # Configuration (e.g., JWT, email setup)
│   └── fastify.js       # Server setup
├── frontend/
│   ├── css/             # Stylesheets
│   ├── js/              # Frontend scripts
│   ├── signup.html      # Signup page
│   ├── login.html       # Login page
│   ├── dashboard.html   # Dashboard page
└── README.md
```

---

## Usage
### Running the Application
1. **Backend**:  
   Navigate to the backend directory and start the server:
   ```bash
   npm run dev
   ```
   The backend will be accessible at `http://localhost:3002`.

2. **Frontend**:  
   Open the `frontend/signup.html` file in your browser to start interacting with the application.

---

## API Endpoints
### Authentication
- **Signup**:  
  `POST /signup`  
  Example Request:
  ```json
  {
    "firstName": "Lydia",
    "lastName": "Ojoawo",
    "email": "example@gmail.com",
    "password": "password123",
    "role": "admin"
  }
  ```

- **Login**:  
  `POST /login`  
  Example Request:
  ```json
  {
    "email": "example@gmail.com",
    "password": "password123"
  }
  ```

- **Email Verification**:  
  `POST /verify`  
  Example Request:
  ```json
  {
    "email": "example@gmail.com",
    "code": "123456"
  }
  ```

### Course Management
- **Add Course** (Admin only):  
  `POST /courses`  
- **Fetch Courses**:  
  `GET /courses`

### Progress Tracking
- **Log Progress**:  
  `POST /progress`  
  Example Request:
  ```json
  {
    "userId": "123",
    "courseId": "456",
    "progress": "80%"
  }
  ```
- **Fetch Progress**:  
  `GET /progress`

---

## Testing
1. **Authentication**:
   Use Postman or CURL to test the `/signup`, `/login`, and `/verify` endpoints.
2. **Courses**:
   Test the course-related routes to ensure proper functionality.
3. **Progress**:
   Log and fetch progress data to confirm the tracking system works.

---

## CI/CD Pipeline
The CI/CD pipeline ensures that the latest code is deployed automatically using:
- **Render** for backend deployment.
- **Netlify** for frontend hosting.

---

## Contributing
We welcome contributions! Follow these steps:
1. Fork the repository.  
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request for review.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributors
 **Lydia Ojoawo**: [GitHub](https://github.com/Lydia02)  

---

Happy Coding! 🎉
