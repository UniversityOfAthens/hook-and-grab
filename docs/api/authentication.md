# Authentication API

[Back to Home](../index.md)

## Overview

The Authentication API handles user registration, login, and logout functionalities.

## Endpoints

### Register a New User

**URL:** `/auth/register`  
**Method:** `POST`  
**Description:** Registers a new user.

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password",
  "email": "email@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "phone": "1234567890" // Optional
}
```

**Response:**

- **201 Created**

  ```json
  {
    "message": "User created successfully.",
    "user": {
      "id": 1,
      "username": "your_username"
    }
  }
  ```

### Login

**URL:** `/auth/login`  
**Method:** `POST`  
**Description:** Authenticates a user.

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**

- **200 OK**

  ```json
  {
    "message": "Logged in successfully.",
    "user": {
      "id": 1,
      "username": "your_username"
    }
  }
  ```

### Logout

**URL:** `/auth/logout`  
**Method:** `POST`  
**Description:** Logs out the current user.

**Response:**

- **200 OK**

  ```json
  {
    "message": "Logged out successfully."
  }
  ```

---

[Back to API Documentation](../index.md#api-documentation)
