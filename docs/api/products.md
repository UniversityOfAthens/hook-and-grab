# Products API

[Back to Home](../index.md)

## Overview

The Products API handles operations related to products for sale or giveaway, including creating, retrieving, updating, deleting, and searching products.

---

## Endpoints

### Get All Products

**URL:** `/products`  
**Method:** `GET`  
**Description:** Retrieves all products.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "products": [
    {
      "id": 1,
      "title": "Bicycle",
      "description": "A mountain bike in good condition.",
      "price": 100.0,
      "isFree": false,
      "isOpenToTrade": true,
      "images": [
        {
          "filename": "1_1616161616161.jpg",
          "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
          "mimeType": "image/jpeg"
        }
      ],
      "datePosted": "2023-10-01T12:00:00Z",
      "sellerId": 1
    },
    // ... more products
  ]
}
```

---

### Get Product by ID

**URL:** `/products/:id`  
**Method:** `GET`  
**Description:** Retrieves a product by its ID.

**Parameters:**

- `:id`: The ID of the product.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "product": {
    "id": 1,
    "title": "Bicycle",
    "description": "A mountain bike in good condition.",
    "price": 100.0,
    "isFree": false,
    "isOpenToTrade": true,
    "images": [
      {
        "filename": "1_1616161616161.jpg",
        "data": "/9j/4AAQSkZJRgABAQEASABIAAD...",
        "mimeType": "image/jpeg"
      }
    ],
    "datePosted": "2023-10-01T12:00:00Z",
    "sellerId": 1
  }
}
```

**Error Responses:**

- **Status Code:** 404 Not Found

```json
{
  "message": "Product not found."
}
```

---

### Create New Product

**URL:** `/products`  
**Method:** `POST`  
**Description:** Creates a new product listing.

**Authentication Required:** Yes (Must be logged in)

**Request Headers:**

- `Content-Type`: `multipart/form-data`

**Form Data:**

- `title`: String (Required)
- `description`: String (Required)
- `price`: Number (Optional if `isFree` is true)
- `isFree`: Boolean (true or false)
- `isOpenToTrade`: Boolean (true or false)
- `images`: Up to 5 image files (JPEG, PNG)

**Successful Response:**

- **Status Code:** 201 Created

```json
{
  "message": "Product posted successfully.",
  "product": {
    "id": 2,
    "title": "Book Collection",
    "sellerId": 1
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
    "title": "Title is required.",
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

### Delete Product

**URL:** `/products/:id`  
**Method:** `DELETE`  
**Description:** Deletes a product listing.

**Authentication Required:** Yes (Must be logged in)

**Parameters:**

- `:id`: The ID of the product to delete.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "message": "Product deleted successfully."
}
```

**Error Responses:**

- **Status Code:** 403 Forbidden

  - User is not the owner of the product.

```json
{
  "message": "You are not authorized to delete this product."
}
```

- **Status Code:** 404 Not Found

```json
{
  "message": "Product not found."
}
```

- **Status Code:** 401 Unauthorized

```json
{
  "message": "You are not logged in."
}
```

---

### Search Products

**URL:** `/products/search`  
**Method:** `GET`  
**Description:** Searches for products with filters.

**Query Parameters:**

- `keyword`: String to search in titles and descriptions.
- `minPrice`: Minimum price.
- `maxPrice`: Maximum price.
- `isFree`: `true` or `false`.
- `isOpenToTrade`: `true` or `false`.

**Successful Response:**

- **Status Code:** 200 OK

```json
{
  "products": [
    // ... filtered products
  ]
}
```

**Error Responses:**

- **Status Code:** 400 Bad Request

  - Invalid query parameters.

```json
{
  "message": "Invalid query parameters."
}
```

---

[Back to API Documentation](../index.md#api-documentation)
