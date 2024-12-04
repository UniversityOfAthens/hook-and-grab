# Products API

[Back to Home](../index.md)

## Overview

The Products API handles operations related to products for sale or giveaway, including creating, retrieving, updating, and deleting products.

## Endpoints

### Get All Products

**URL:** `/products/`  
**Method:** `GET`  
**Description:** Retrieves all products.

**Response:**

- **200 OK**

  ```json
  {
    "products": [
      {
        "id": 1,
        "title": "Bicycle",
        "description": "A mountain bike in good condition.",
        "price": 100.0,
        "isFree": 0,
        "isOpenToTrade": 1,
        "images": "/uploads/products/1_1616161616161.jpg",
        "datePosted": "2023-10-01T12:00:00Z",
        "sellerId": 1
      },
      // ... more products
    ]
  }
  ```

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

**Response:**

- **200 OK**

  ```json
  {
    "products": [
      // ... filtered products
    ]
  }
  ```

### Get Product by ID

**URL:** `/products/:id`  
**Method:** `GET`  
**Description:** Retrieves a product by its ID.

**Response:**

- **200 OK**

  ```json
  {
    "product": {
      "id": 1,
      "title": "Bicycle",
      "description": "A mountain bike in good condition.",
      "price": 100.0,
      "isFree": 0,
      "isOpenToTrade": 1,
      "images": "/uploads/products/1_1616161616161.jpg",
      "datePosted": "2023-10-01T12:00:00Z",
      "sellerId": 1
    }
  }
  ```

### Create New Product

**URL:** `/products/`  
**Method:** `POST`  
**Description:** Creates a new product listing.

**Form Data:**

- `title`: String
- `description`: String
- `price`: Number (optional if `isFree` is true)
- `isFree`: Boolean
- `isOpenToTrade`: Boolean
- `images`: Up to 5 image files (JPEG, PNG)

**Response:**

- **201 Created**

  ```json
  {
    "message": "Product posted successfully.",
    "product": {
      "id": 2,
      "title": "Book Collection"
    }
  }
  ```

### Delete Product

**URL:** `/products/:id`  
**Method:** `DELETE`  
**Description:** Deletes a product listing.

**Response:**

- **200 OK**

  ```json
  {
    "message": "Product deleted successfully."
  }
  ```

---

[Back to API Documentation](../index.md#api-documentation)
