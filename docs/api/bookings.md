# Bookings API

[Back to Home](../index.md)

## Overview

The Bookings API manages booking operations for boat rentals, including creating booking requests, viewing bookings, and updating booking statuses.

## Endpoints

### Create a Booking Request

**URL:** `/bookings/`  
**Method:** `POST`  
**Description:** Creates a booking request for a boat.

**Request Body:**

```json
{
  "boatId": 1,
  "startDate": "2023-11-01",
  "endDate": "2023-11-05"
}
```

**Response:**

- **201 Created**

  ```json
  {
    "message": "Booking request submitted.",
    "booking": {
      "id": 1
    }
  }
  ```

### Get Bookings for Boat Owner

**URL:** `/bookings/owner`  
**Method:** `GET`  
**Description:** Retrieves all booking requests for boats owned by the current user.

**Response:**

- **200 OK**

  ```json
  {
    "bookings": [
      {
        "id": 1,
        "boatId": 1,
        "renterId": 2,
        "startDate": "2023-11-01",
        "endDate": "2023-11-05",
        "status": "pending"
      },
      // ... more bookings
    ]
  }
  ```

### Get Bookings for Renter

**URL:** `/bookings/renter`  
**Method:** `GET`  
**Description:** Retrieves all booking requests made by the current user.

**Response:**

- **200 OK**

  ```json
  {
    "bookings": [
      {
        "id": 1,
        "boatId": 1,
        "renterId": 2,
        "startDate": "2023-11-01",
        "endDate": "2023-11-05",
        "status": "pending"
      },
      // ... more bookings
    ]
  }
  ```

### Update Booking Status

**URL:** `/bookings/:id/status`  
**Method:** `PUT`  
**Description:** Updates the status of a booking request.

**Request Body:**

```json
{
  "status": "approved" // or "rejected"
}
```

**Response:**

- **200 OK**

  ```json
  {
    "message": "Booking status updated."
  }
  ```

---

[Back to API Documentation](../index.md#api-documentation)
