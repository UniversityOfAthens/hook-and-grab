# Backend Project Structure

[Back to Home](../index.md)

## Overview

The backend of **BlueEco-pedia** is organized using a modular structure to enhance maintainability, scalability, and readability. Each component has a specific role, adhering to the separation of concerns principle.

---

## Directory Layout

```
backend/
├── index.js
├── package.json
├── .gitignore
├── config/
│   ├── passport.js
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── productController.js
│   ├── boatController.js
│   └── bookingController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── corsMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Boat.js
│   └── Booking.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── products.js
│   ├── boats.js
│   └── bookings.js
├── uploads/
│   ├── profiles/
│   ├── products/
│   └── boats/
├── utils/
│   └── helpers.js
└── validations/
    ├── userValidation.js
    ├── productValidation.js
    └── boatValidation.js
```

---

## Components Breakdown

### **index.js**

- Entry point of the application.
- Initializes the server, middleware, and routes.

### **config/**

- Contains configuration files.
- **passport.js**: Configures authentication strategies.
- **database.js**: Manages database connections and initialization.

### **controllers/**

- Handles the business logic for each route.
- **authController.js**: Authentication logic.
- **userController.js**: User-related operations.
- **productController.js**: Product operations.
- **boatController.js**: Boat listing operations.
- **bookingController.js**: Booking operations.

### **middlewares/**

- Contains middleware functions.
- **authMiddleware.js**: Authentication checks.
- **corsMiddleware.js**: CORS configuration.
- **uploadMiddleware.js**: File upload handling.

### **models/**

- Defines data models and interacts with the database.
- **User.js**: User model and database operations.
- **Product.js**: Product model and operations.
- **Boat.js**: Boat model for rental listings.
- **Booking.js**: Booking model for rental reservations.

### **routes/**

- Defines application routes and endpoints.
- **auth.js**: Authentication routes.
- **users.js**: User routes.
- **products.js**: Product routes.
- **boats.js**: Boat routes.
- **bookings.js**: Booking routes.

### **uploads/**

- Stores uploaded files.
- **profiles/**: Profile pictures.
- **products/**: Product images.
- **boats/**: Boat images.

### **utils/**

- Utility functions and helpers.
- **helpers.js**: Contains utility functions.

### **validations/**

- Input validation logic.
- **userValidation.js**: Validates user registration and update data.
- **productValidation.js**: Validates product data.
- **boatValidation.js**: Validates boat listing data.

---

[Back to Backend Structure](../index.md#backend-structure)
