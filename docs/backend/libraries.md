# Libraries and Frameworks

[Back to Home](../index.md)

## Overview

The backend leverages several libraries and frameworks to enhance development efficiency, security, and performance.

## Key Libraries and Their Roles

### **Express.js**

- **Purpose:** Web application framework for Node.js.
- **Why Used:** Simplifies routing and middleware management, enabling rapid API development.

### **Passport.js**

- **Purpose:** Authentication middleware.
- **Why Used:** Provides a flexible and modular authentication system, supporting various strategies (e.g., local, OAuth).

### **SQLite3**

- **Purpose:** Lightweight SQL database engine.
- **Why Used:** Offers a serverless, file-based database, suitable for quick setup without requiring a separate database server.

### **bcrypt**

- **Purpose:** Password hashing.
- **Why Used:** Securely hashes passwords before storing them, enhancing user data security.

### **Multer**

- **Purpose:** Handling multipart/form-data, primarily for file uploads.
- **Why Used:** Simplifies handling file uploads for profile pictures and product images.

### **Validator.js**

- **Purpose:** String validation and sanitization.
- **Why Used:** Validates and sanitizes user input to prevent invalid data and security vulnerabilities.

### **Express-Session**

- **Purpose:** Session management.
- **Why Used:** Manages user sessions, storing session data on the server side, which is essential for maintaining authentication state.

### **CORS**

- **Purpose:** Cross-Origin Resource Sharing.
- **Why Used:** Enables controlled access to resources from external domains, necessary for frontend-backend communication.

### **Nodemon**

- **Purpose:** Utility that monitors for changes in source code and automatically restarts the server.
- **Why Used:** Enhances development efficiency by eliminating the need to manually restart the server after code changes.

## Design Choices and Best Practices

### **Modular Architecture**

- **Reasoning:** Improves code maintainability, readability, and scalability by separating concerns.
- **Benefit:** Easier collaboration among developers, as each module can be worked on independently.

### **Separation of Concerns**

- **Controllers:** Handle business logic.
- **Models:** Interact with the database.
- **Routes:** Define API endpoints.
- **Middlewares:** Process requests and enforce policies.
- **Validations:** Ensure data integrity and security.

### **Security Practices**

- **Password Hashing:** Uses bcrypt to protect user passwords.
- **Input Validation:** Prevents malicious data from entering the system.
- **Parameterized Queries:** Protects against SQL injection attacks.

### **Session Management**

- **Express-Session with Cookies:** Maintains user authentication state across requests.
- **Secure Cookies:** In production, cookies should be transmitted over HTTPS with secure flags.

### **File Upload Handling**

- **Multer:** Manages file uploads securely.
- **File Type Validation:** Accepts only specific file types (e.g., JPEG, PNG) to prevent malicious files.

---

[Back to Backend Structure](../index.md#backend-structure)
