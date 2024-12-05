# Users API

[Back to Home](../index.md)

## Overview

The Users API manages user-related operations like fetching user details, updating profile pictures, searching users, and deleting accounts.

---

## Endpoints

### Get Current User

**URL:** `/users/me`  
**Method:** `GET`  
**Description:** Retrieves the current authenticated user's information.

**Authentication Required:** Yes (Must be logged in)

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "user": {
    "id": 1,
    "username": "your_username",
    "email": "email@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "phone": "1234567890",
    "profilePicture": {
      "filename": "1_1616161616161.jpg",
      "data": "/9j/4AAQSkZJRgABAQEASABIAAD...", // Base64 encoded data
      "mimeType": "image/jpeg"
    }
  }
}
```

**Error Responses:**

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Update Profile Picture

**URL:** `/users/profile-picture`  
**Method:** `POST`  
**Description:** Updates the user's profile picture.

**Authentication Required:** Yes (Must be logged in)

**Request Headers:**

- `Content-Type`: `multipart/form-data`

**Form Data:**

- `profilePicture`: Image file (JPEG, PNG)

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Profile picture updated successfully.",
  "user": {
    "id": 1,
    "profilePicture": {
      "filename": "1_1616161616161.jpg",
      "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
      "mimeType": "image/jpeg"
    }
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - No file uploaded or invalid file type.

```json
{
  "message": "Please upload a valid image file (JPEG or PNG)."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Delete Account

<span style="color:red">This has not yet been implemented yet. We're still at `/users/delete`</span><br>
**URL:** `/users/me`  
**Method:** `DELETE`  
**Description:** Deletes the current user's account.

**Authentication Required:** Yes (Must be logged in)

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Account deleted successfully."
}
```

**Error Responses:**

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Search Users

**URL:** `/users/search`  
**Method:** `GET`  
**Description:** Searches for users by keyword.

**Authentication Required:** Yes (Must be logged in)

**Query Parameters:**

- `keyword`: String to search in usernames, first names, and last names. (Required)

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "users": [
    {
      "id": 2,
      "username": "jane_doe",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "profilePicture": {
        "filename": "2_1616161616162.jpg",
        "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
        "mimeType": "image/jpeg"
      }
    },
    // ... more users
  ]
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Missing keyword parameter.

```json
{
  "message": "Keyword parameter is required."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

[Back to API Documentation](../index.md#api-documentation)
