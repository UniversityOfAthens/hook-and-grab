# Boats API

[Back to Home](../index.md)

## Overview

The Boats API manages operations related to boat listings for rent, including creating, retrieving, and deleting boat listings.

## Endpoints

### Get All Boats

**URL:** `/boats/`  
**Method:** `GET`  
**Description:** Retrieves all boat listings.

**Response:**

- **200 OK**

  ```json
  {
    "boats": [
      {
        "id": 1,
        "ownerId": 1,
        "title": "Luxury Yacht",
        "description": "A luxurious yacht available for rent.",
        "pricePerDay": 5000.0,
        "location": "Miami Beach",
        "images": "/uploads/boats/1_1616161616161.jpg",
        "datePosted": "2023-10-01T12:00:00Z"
      },
      // ... more boats
    ]
  }
  ```

### Get Boat by ID

**URL:** `/boats/:id`  
**Method:** `GET`  
**Description:** Retrieves a boat listing by its ID.

**Response:**

- **200 OK**

  ```json
  {
    "boat": {
      "id": 1,
      "ownerId": 1,
      "title": "Luxury Yacht",
      "description": "A luxurious yacht available for rent.",
      "pricePerDay": 5000.0,
      "location": "Miami Beach",
      "images": "/uploads/boats/1_1616161616161.jpg",
      "datePosted": "2023-10-01T12:00:00Z"
    }
  }
  ```

### Create New Boat Listing

**URL:** `/boats/`  
**Method:** `POST`  
**Description:** Creates a new boat listing for rent.

**Form Data:**

- `title`: String
- `description`: String
- `pricePerDay`: Number
- `location`: String
- `images`: Up to 5 image files (JPEG, PNG)

**Response:**

- **201 Created**

  ```json
  {
    "message": "Boat listed successfully.",
    "boat": {
      "id": 2,
      "title": "Speed Boat"
    }
  }
  ```

### Delete Boat Listing

**URL:** `/boats/:id`  
**Method:** `DELETE`  
**Description:** Deletes a boat listing.

**Response:**

- **200 OK**

  ```json
  {
    "message": "Boat deleted successfully."
  }
  ```

---

[Back to API Documentation](../index.md#api-documentation)
