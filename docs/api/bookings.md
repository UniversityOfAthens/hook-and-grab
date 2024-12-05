# Bookings API

[Back to Home](../index.md)

## Overview

The Bookings API manages booking operations for boat rentals, including creating booking requests, viewing bookings, and updating booking statuses.

---

## Endpoints

### Create a Booking Request

**URL:** `/boats/:boatId/bookings`  
**Method:** `POST`  
**Description:** Creates a booking request for a boat.

**Authentication Required:** Yes (Must be logged in)

**Parameters:**

- `:boatId`: The ID of the boat to book.

**Request Headers:**

- `Content-Type`: `application/json`

**Request Body:**

```json
{
  "startDate": "2023-11-01",
  "endDate": "2023-11-05"
}
```

**Successful Response:**

- **Status Code:** 201 Created

```json
{
  "message": "Booking request submitted.",
  "booking": {
    "id": 1,
    "boatId": 1,
    "renterId": 2,
    "startDate": "2023-11-01",
    "endDate": "2023-11-05",
    "status": "pending"
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Missing or invalid dates.

```json
{
  "message": "Invalid booking dates."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

- **Status Code:** 404 Not Found

```json
{
  "message": "Boat not found."
}
```

---

### Get Bookings by Boat Owner

**URL:** `/boats/:boatId/bookings`  
**Method:** `GET`  
**Description:** Retrieves all booking requests for a boat owned by the current user.

**Authentication Required:** Yes (Must be logged in)

**Parameters:**

- `:boatId`: The ID of the boat.

**Successful Response:**

- **Status Code:** 200 OK

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

**Error Responses:**

- **Status Code:** 403 Forbidden

  - User is not the owner of the boat.

```json
{
  "message": "You are not authorized to view these bookings."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Update Booking Status

**URL:** `/boats/:boatId/bookings/:bookingId/status`  
**Method:** `PUT`  
**Description:** Updates the status of a booking request.

**Authentication Required:** Yes (Must be logged in)

**Parameters:**

- `:boatId`: The ID of the boat.
- `:bookingId`: The ID of the booking.

**Request Headers:**

- `Content-Type`: `application/json`

**Request Body:**

```json
{
  "status": "approved" // or "rejected"
}
```

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Booking status updated.",
  "booking": {
    "id": 1,
    "status": "approved"
  }
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Invalid status.

```json
{
  "message": "Invalid booking status."
}
```

- **Status Code:** 403 Forbidden

  - User is not the owner of the boat.

```json
{
  "message": "You are not authorized to update this booking."
}
```

- **Status Code:** 404 Not Found

```json
{
  "message": "Booking not found."
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
