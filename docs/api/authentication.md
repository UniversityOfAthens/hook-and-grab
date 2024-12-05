# Authentication API

[Back to Home](../index.md)

## Overview

The Authentication API handles user registration, login, and logout functionalities.

---

## Endpoints

### Register a New User

**URL:** `/auth/register`  
**Method:** `POST`  
**Description:** Registers a new user.

**Request Headers:**

- `Content-Type`: `application/json`

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

**Successful Response:**

- **Status Code:** 201 Created

```json
{
  "message": "User created successfully.",
  "user": {
    "id": 1,
    "username": "your_username",
    "email": "email@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "phone": "1234567890",
    "profilePicture": null // Default profile picture
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Validation errors due to missing or invalid fields.

```json
{
  "message": "Validation error.",
  "errors": {
    "username": "Username is required.",
    "password": "Password must be at least 8 characters long."
    // ...other validation errors
  }
}
```

- **Status Code:** 409 Conflict

  - Username or email already exists.

```json
{
  "message": "Username or email already exists."
}
```

---

### Login

**URL:** `/auth/login`  
**Method:** `POST`  
**Description:** Authenticates a user.

**Request Headers:**

- `Content-Type`: `application/json`

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Logged in successfully.",
  "user": {
    "id": 1,
    "username": "your_username",
    "email": "email@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profilePicture": null
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Missing username or password.

```json
{
  "message": "Username and password are required."
}
```

- **Status Code:** 401 Unauthorized

  - Incorrect username or password.

```json
{
  "message": "Invalid username or password."
}
```

---

### Logout

**URL:** `/auth/logout`  
**Method:** `POST`  
**Description:** Logs out the current user.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Logged out successfully."
}
```

**Error Responses:**

- **Status Code:** 401 Unauthorized

  - User is not logged in.

```json
{
  "message": "You are not logged in."
}
```

---

[Back to API Documentation](../index.md#api-documentation)
