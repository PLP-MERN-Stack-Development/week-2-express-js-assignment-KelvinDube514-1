# 🚂 Express.js RESTful API Assignment

A fully-featured RESTful API built with Express.js implementing CRUD operations, middleware, error handling, and advanced features like filtering, pagination, and search.

## 🛠️ Setup

### Prerequisites
1. **Node.js**: Make sure you have Node.js installed (v18 or higher recommended)
   - Current version: `v22.16.0` ✅
   - Check your version: `node --version`
   - Download from: [nodejs.org](https://nodejs.org/)

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd week-2-express-js-assignment-KelvinDube514-1
   ```

2. **Install the required dependencies**:
   ```bash
   npm install express body-parser uuid
   ```
   
   **Additional testing dependency** (already included):
   ```bash
   npm install axios  # For API testing
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   The server will run on: `http://localhost:3000`

### 🧪 Testing Your API

You can test the API using various tools:

#### Option 1: Use the provided test scripts
```bash
# Test basic middleware functionality
node test-middleware.js

# Test advanced features (filtering, pagination, search, stats)
node test-advanced-features.js
```

#### Option 2: Use Postman, Insomnia, or similar tools
- Import the API endpoints documented below
- Use the provided examples for testing

#### Option 3: Use curl commands
```bash
# Test basic endpoint
curl http://localhost:3000/

# Get all products
curl http://localhost:3000/api/products

# Get products with filtering
curl "http://localhost:3000/api/products?category=electronics&page=1&limit=2"

# Search products
curl "http://localhost:3000/api/products/search?q=laptop"

# Get statistics
curl http://localhost:3000/api/products/stats
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
For write operations (POST, PUT, DELETE), include an API key in headers:
```
x-api-key: your-secret-api-key-123
```
or
```
Authorization: Bearer your-secret-api-key-123
```

### 🔗 Endpoints

#### Basic Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Hello World | ❌ |
| GET | `/api/products` | Get all products with filtering/pagination | ❌ |
| GET | `/api/products/:id` | Get specific product | ❌ |
| POST | `/api/products` | Create new product | ✅ |
| PUT | `/api/products/:id` | Update product | ✅ |
| DELETE | `/api/products/:id` | Delete product | ✅ |

#### Advanced Features

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products/search` | Search products by name/description | ❌ |
| GET | `/api/products/stats` | Get product statistics | ❌ |

### 🔍 Query Parameters for /api/products

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | none | Filter by category (case-insensitive) |
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Items per page |
| `sortBy` | string | 'name' | Sort field (name, price, category, inStock) |
| `sortOrder` | string | 'asc' | Sort order ('asc' or 'desc') |

### 🔍 Query Parameters for /api/products/search

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | ✅ | Search query |
| `page` | number | ❌ | Page number (default: 1) |
| `limit` | number | ❌ | Items per page (default: 10) |

## 📋 Product Schema

```json
{
  "id": "string (UUID)",
  "name": "string (required, min 2 chars)",
  "description": "string (required, min 10 chars)",
  "price": "number (required, > 0)",
  "category": "string (required)",
  "inStock": "boolean (default: true)"
}
```

## 🧪 Example Requests & Responses

### 1. Get All Products with Pagination
```bash
GET /api/products?page=1&limit=2
```

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
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 3,
    "itemsPerPage": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "sortBy": "name",
    "sortOrder": "asc"
  }
}
```

### 2. Create New Product
```bash
POST /api/products
Headers: x-api-key: your-secret-api-key-123
Content-Type: application/json

{
  "name": "Gaming Mouse",
  "description": "High-precision gaming mouse with RGB lighting",
  "price": 79.99,
  "category": "electronics",
  "inStock": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "generated-uuid",
    "name": "Gaming Mouse",
    "description": "High-precision gaming mouse with RGB lighting",
    "price": 79.99,
    "category": "electronics",
    "inStock": true
  }
}
```

### 3. Search Products
```bash
GET /api/products/search?q=laptop&page=1&limit=5
```

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
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 5,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "searchQuery": "laptop",
  "message": "Found 1 product(s) matching \"laptop\""
}
```

### 4. Get Product Statistics
```bash
GET /api/products/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalProducts": 3,
      "totalCategories": 2,
      "totalValue": 2050.00,
      "averagePrice": 683.33
    },
    "categoryBreakdown": {
      "electronics": 2,
      "kitchen": 1
    },
    "stockStatus": {
      "inStock": 2,
      "outOfStock": 1,
      "stockPercentage": 66.67
    },
    "priceAnalysis": {
      "minPrice": 50,
      "maxPrice": 1200,
      "averagePrice": 683.33,
      "priceRange": 1150,
      "mostExpensive": {
        "name": "Laptop",
        "price": 1200
      },
      "cheapest": {
        "name": "Coffee Maker",
        "price": 50
      }
    },
    "categories": ["electronics", "kitchen"]
  }
}
```

## 🚨 Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "errors": [
      "Name must be at least 2 characters long",
      "Price must be greater than 0"
    ]
  }
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "error": {
    "message": "API key is required. Please provide x-api-key header or Authorization header"
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": {
    "message": "Product not found"
  }
}
```

## 🏗️ Project Structure

```
├── server.js                           # Main Express server
├── middleware/
│   ├── auth.js                         # Authentication middleware
│   ├── errors.js                       # Error handling & custom error classes
│   ├── logger.js                       # Request logging middleware
│   └── validation.js                   # Product validation middleware
├── test-middleware.js                  # Middleware functionality tests
├── test-advanced-features.js           # Advanced features tests
├── MIDDLEWARE_DOCUMENTATION.md         # Middleware documentation
├── ADVANCED_FEATURES_DOCUMENTATION.md  # Advanced features documentation
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## ✨ Features Implemented

### ✅ Task 1: Express.js Setup
- Basic Express server listening on port 3000
- Hello World route at root endpoint

### ✅ Task 2: RESTful API Routes
- Complete CRUD operations for products
- Proper HTTP status codes and JSON responses

### ✅ Task 3: Middleware Implementation
- Custom logger middleware (logs method, URL, timestamp)
- JSON body parsing middleware
- Authentication middleware (API key validation)
- Validation middleware for product creation/updates

### ✅ Task 4: Error Handling
- Global error handling middleware
- Custom error classes (NotFoundError, ValidationError, etc.)
- Proper error responses with appropriate HTTP status codes
- Async error handling using wrapper functions

### ✅ Task 5: Advanced Features
- Query parameters for filtering products by category
- Pagination support for product listing
- Search endpoint for finding products by name/description
- Statistics endpoint with comprehensive analytics

## 🧪 Testing

The project includes comprehensive test suites:

1. **Middleware Tests** (`test-middleware.js`):
   - Authentication with/without API keys
   - Validation with valid/invalid data
   - All CRUD operations with proper middleware

2. **Advanced Features Tests** (`test-advanced-features.js`):
   - Filtering by category
   - Pagination functionality
   - Sorting capabilities
   - Search functionality
   - Statistics endpoint
   - Combined feature usage

Run tests with:
```bash
npm start                           # Start server first
node test-middleware.js            # Test middleware
node test-advanced-features.js     # Test advanced features
```

## 🚀 Development

### Adding New Features
1. Create middleware in `middleware/` directory
2. Add routes to `server.js`
3. Update validation in `middleware/validation.js`
4. Add tests to appropriate test files
5. Update documentation

### Environment Variables
Create a `.env` file for production:
```env
API_KEY=your-production-api-key-here
PORT=3000
NODE_ENV=production
```

## 📖 Additional Documentation

- [Middleware Documentation](./MIDDLEWARE_DOCUMENTATION.md)
- [Advanced Features Documentation](./ADVANCED_FEATURES_DOCUMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Update documentation
5. Submit a pull request

---

**Assignment completed by**: Kelvin Dube  
**Framework**: Express.js  
**Node.js Version**: v22.16.0  
**Features**: Full RESTful API with middleware, error handling, and advanced features 