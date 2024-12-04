# Users API

[Back to Home](../index.md)

## Overview

The Users API manages user-related operations like fetching user details, updating profile pictures, and deleting accounts.

## Endpoints

### Get Current User

**URL:** `/users/me`  
**Method:** `GET`  
**Description:** Retrieves the current authenticated user's information.

**Response:**

- **200 OK**

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
      "profilePicture": "/uploads/profiles/1_1616161616161.jpg"
    }
  }
  ```

### Update Profile Picture

**URL:** `/users/profile-picture`  
**Method:** `POST`  
**Description:** Updates the user's profile picture.

**Form Data:**

- `profilePicture`: Image file (JPEG, PNG)

**Response:**

- **200 OK**

  ```json
  {
    "message": "Profile picture updated successfully.",
    "profilePicture": "/uploads/profiles/1_1616161616161.jpg"
  }
  ```

### Delete Account

**URL:** `/users/delete`  
**Method:** `DELETE`  
**Description:** Deletes the current user's account.

**Response:**

- **200 OK**

  ```json
  {
    "message": "Account deleted successfully."
  }
  ```

### Search Users

**URL:** `/users/search`  
**Method:** `GET`  
**Description:** Searches for users by keyword.

**Query Parameters:**

- `keyword`: String to search in usernames, first names, and last names.

**Response:**

- **200 OK**

  ```json
  {
    "users": [
      {
        "id": 2,
        "username": "jane_doe",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@example.com"
      },
      // ... more users
    ]
  }
  ```

---

[Back to API Documentation](../index.md#api-documentation)
