# Products API Documentation

## Overview
This is a RESTful API for managing products with full CRUD operations. The API is built with Express.js and provides endpoints for creating, reading, updating, and deleting products.

## Base URL
```
http://localhost:3000/api
```

## Product Schema
Each product has the following fields:
- `id` (string, unique identifier) - Auto-generated UUID
- `name` (string, required) - Product name
- `description` (string, required) - Product description
- `price` (number, required) - Product price (must be positive)
- `category` (string, required) - Product category
- `inStock` (boolean, optional) - Stock availability (defaults to true)

## API Endpoints

### 1. Get All Products
**GET** `/api/products`

Returns a list of all products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ],
  "count": 1
}
```

### 2. Get Product by ID
**GET** `/api/products/:id`

Returns a specific product by its ID.

**Parameters:**
- `id` (string) - Product ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 3. Create New Product
**POST** `/api/products`

Creates a new product.

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "electronics",
  "inStock": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "generated-uuid",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "electronics",
    "inStock": true
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Missing required fields: name, description, price, and category are required"
}
```

### 4. Update Product
**PUT** `/api/products/:id`

Updates an existing product. Only provided fields will be updated.

**Parameters:**
- `id` (string) - Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 149.99
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "1",
    "name": "Updated Product Name",
    "description": "High-performance laptop with 16GB RAM",
    "price": 149.99,
    "category": "electronics",
    "inStock": true
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 5. Delete Product
**DELETE** `/api/products/:id`

Deletes a product by its ID.

**Parameters:**
- `id` (string) - Product ID

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

## Error Handling

All endpoints return consistent error responses with appropriate HTTP status codes:

- **400 Bad Request** - Validation errors (missing fields, invalid data types)
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

Error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

## Sample Requests

### Using curl

**Get all products:**
```bash
curl -X GET http://localhost:3000/api/products
```

**Get specific product:**
```bash
curl -X GET http://localhost:3000/api/products/1
```

**Create new product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "electronics",
    "inStock": true
  }'
```

**Update product:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 149.99
  }'
```

**Delete product:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

### Using JavaScript (axios)

```javascript
const axios = require('axios');

// Get all products
const products = await axios.get('http://localhost:3000/api/products');

// Create new product
const newProduct = await axios.post('http://localhost:3000/api/products', {
  name: 'New Product',
  description: 'Product description',
  price: 99.99,
  category: 'electronics',
  inStock: true
});

// Update product
const updatedProduct = await axios.put('http://localhost:3000/api/products/1', {
  name: 'Updated Product',
  price: 149.99
});

// Delete product
await axios.delete('http://localhost:3000/api/products/1');
```

## Running the Server

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Testing

Run the test script to verify all endpoints:
```bash
node test-api.js
``` 