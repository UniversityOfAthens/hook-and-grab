# Boats API

[Back to Home](../index.md)

## Overview

The Boats API manages operations related to boat listings for rent, including creating, retrieving, deleting boats, and handling bookings.

---

## Endpoints

### Get All Boats

**URL:** `/boats`  
**Method:** `GET`  
**Description:** Retrieves all boat listings.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "boats": [
    {
      "id": 1,
      "name": "Luxury Yacht",
      "description": "A luxurious yacht available for rent.",
      "pricePerDay": 5000.0,
      "location": "Miami Beach",
      "images": [
        {
          "filename": "1_1616161616161.jpg",
          "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
          "mimeType": "image/jpeg"
        }
      ],
      "datePosted": "2023-10-01T12:00:00Z",
      "ownerId": 1
    },
    // ... more boats
  ]
}
```

---

### Get Boat by ID

**URL:** `/boats/:boatId`  
**Method:** `GET`  
**Description:** Retrieves a boat listing by its ID.

**Parameters:**

- `:boatId`: The ID of the boat.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "boat": {
    "id": 1,
    "name": "Luxury Yacht",
    "description": "A luxurious yacht available for rent.",
    "pricePerDay": 5000.0,
    "location": "Miami Beach",
    "images": [
      {
        "filename": "1_1616161616161.jpg",
        "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
        "mimeType": "image/jpeg"
      }
    ],
    "datePosted": "2023-10-01T12:00:00Z",
    "ownerId": 1
  }
}
```

**Error Responses:**

- **Status Code:** 404 Not Found

```json
{
  "message": "Boat not found."
}
```

---

### Create New Boat Listing

**URL:** `/boats`  
**Method:** `POST`  
**Description:** Creates a new boat listing for rent.

**Authentication Required:** Yes (Must be logged in)

**Request Headers:**

- `Content-Type`: `multipart/form-data`

**Form Data:**

- `name`: String (Required)
- `description`: String (Required)
- `pricePerDay`: Number (Required)
- `location`: String (Required)
- `images`: Up to 5 image files (JPEG, PNG)

**Successful Response:**

- **Status Code:** 201 Created

```json
{
  "message": "Boat listed successfully.",
  "boat": {
    "id": 2,
    "name": "Speed Boat",
    "ownerId": 1
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Missing required fields or invalid data.

```json
{
  "message": "Validation error.",
  "errors": {
    "name": "Name is required.",
    "description": "Description is required."
  }
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Delete Boat Listing

**URL:** `/boats/:boatId`  
**Method:** `DELETE`  
**Description:** Deletes a boat listing.

**Authentication Required:** Yes (Must be logged in)

**Parameters:**

- `:boatId`: The ID of the boat to delete.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Boat deleted successfully."
}
```

**Error Responses:**

- **Status Code:** 403 Forbidden

  - User is not the owner of the boat.

```json
{
  "message": "You are not authorized to delete this boat."
}
```

- **Status Code:** 404 Not Found

```json
{
  "message": "Boat not found."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

[Bookings API](./bookings.md)

[Back to API Documentation](../index.md#api-documentation)
