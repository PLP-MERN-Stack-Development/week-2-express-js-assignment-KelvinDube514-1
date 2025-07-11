# 🚀 Advanced Features Documentation (Task 5)

This document details the advanced features implemented for the Express.js RESTful API, including filtering, pagination, search, and statistics.

## 🔍 Feature Overview

| Feature | Endpoint | Description |
|---------|----------|-------------|
| **Filtering & Pagination** | `GET /api/products` | Filter by category, paginate results, sort by fields |
| **Search** | `GET /api/products/search` | Search products by name and description |
| **Statistics** | `GET /api/products/stats` | Get comprehensive product analytics |

## 📋 1. Query Parameters for Filtering

### Endpoint: `GET /api/products`

The main products endpoint now supports advanced filtering and pagination through query parameters.

#### Available Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | none | Filter products by category (case-insensitive) |
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Number of items per page |
| `sortBy` | string | 'name' | Field to sort by (name, price, category, inStock) |
| `sortOrder` | string | 'asc' | Sort order: 'asc' or 'desc' |

#### Example Requests

```bash
# Filter by category
GET /api/products?category=electronics

# Pagination
GET /api/products?page=2&limit=5

# Sorting by price (descending)
GET /api/products?sortBy=price&sortOrder=desc

# Combined filters
GET /api/products?category=electronics&page=1&limit=3&sortBy=price&sortOrder=asc
```

#### Response Format

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
    "category": "electronics",
    "sortBy": "price",
    "sortOrder": "asc"
  }
}
```

## 🔍 2. Search Functionality

### Endpoint: `GET /api/products/search`

Search products by name and description with pagination support.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | ✅ Yes | Search query (searches name and description) |
| `page` | number | ❌ No | Page number (default: 1) |
| `limit` | number | ❌ No | Items per page (default: 10) |

#### Example Requests

```bash
# Basic search
GET /api/products/search?q=laptop

# Search with pagination
GET /api/products/search?q=coffee&page=1&limit=5

# Search for partial matches
GET /api/products/search?q=high-performance
```

#### Response Format

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
    "itemsPerPage": 10,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "searchQuery": "laptop",
  "message": "Found 1 product(s) matching \"laptop\""
}
```

#### Search Features

- **Case-insensitive**: Searches ignore case differences
- **Partial matching**: Finds products containing the search term
- **Multi-field search**: Searches both product name and description
- **Pagination support**: Results can be paginated
- **No results handling**: Returns empty array with appropriate message

#### Error Handling

```json
// Missing search query
{
  "success": false,
  "error": {
    "message": "Search query (q) is required"
  }
}
```

## 📊 3. Product Statistics

### Endpoint: `GET /api/products/stats`

Get comprehensive analytics and statistics about the product catalog.

#### Example Request

```bash
GET /api/products/stats
```

#### Response Format

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

#### Statistics Included

1. **Overview**
   - Total number of products
   - Number of unique categories
   - Total catalog value
   - Average product price

2. **Category Breakdown**
   - Count of products per category

3. **Stock Status**
   - Products in stock vs out of stock
   - Stock percentage

4. **Price Analysis**
   - Minimum and maximum prices
   - Average price and price range
   - Most expensive and cheapest products

5. **Categories List**
   - Sorted list of all available categories

## 🧪 Testing the Advanced Features

Run the comprehensive test suite:

```bash
# Start the server
npm start

# Run advanced features tests
node test-advanced-features.js
```

### Manual Testing Examples

```bash
# Test filtering
curl "http://localhost:3000/api/products?category=electronics"

# Test pagination
curl "http://localhost:3000/api/products?page=1&limit=2"

# Test sorting
curl "http://localhost:3000/api/products?sortBy=price&sortOrder=desc"

# Test search
curl "http://localhost:3000/api/products/search?q=laptop"

# Test statistics
curl "http://localhost:3000/api/products/stats"

# Test combined features
curl "http://localhost:3000/api/products?category=electronics&page=1&limit=1&sortBy=price&sortOrder=asc"
```

## 📱 Frontend Integration Examples

### JavaScript/React Examples

```javascript
// Fetch products with filters
const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`);
  return response.json();
};

// Usage examples
const electronicsPage1 = await fetchProducts({
  category: 'electronics',
  page: 1,
  limit: 5
});

const expensiveFirst = await fetchProducts({
  sortBy: 'price',
  sortOrder: 'desc'
});

// Search products
const searchProducts = async (query, page = 1) => {
  const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}`);
  return response.json();
};

// Get statistics
const getStats = async () => {
  const response = await fetch('/api/products/stats');
  return response.json();
};
```

## 🔧 Implementation Details

### Pagination Logic

```javascript
// Calculate pagination
const pageNum = parseInt(page);
const limitNum = parseInt(limit);
const startIndex = (pageNum - 1) * limitNum;
const endIndex = pageNum * limitNum;

const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

const pagination = {
  currentPage: pageNum,
  totalPages: Math.ceil(filteredProducts.length / limitNum),
  totalItems: filteredProducts.length,
  itemsPerPage: limitNum,
  hasNextPage: endIndex < filteredProducts.length,
  hasPrevPage: pageNum > 1
};
```

### Search Implementation

```javascript
// Case-insensitive search in name and description
const searchQuery = q.toLowerCase();
const searchResults = products.filter(product => 
  product.name.toLowerCase().includes(searchQuery) ||
  product.description.toLowerCase().includes(searchQuery)
);
```

### Sorting Implementation

```javascript
// Dynamic sorting with type handling
filteredProducts.sort((a, b) => {
  let aValue = a[sortBy];
  let bValue = b[sortBy];
  
  // Handle string comparisons
  if (typeof aValue === 'string') {
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();
  }
  
  if (sortOrder === 'desc') {
    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
  } else {
    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
  }
});
```

## 🚀 Performance Considerations

1. **In-Memory Implementation**: Current implementation uses in-memory arrays suitable for small datasets
2. **Database Optimization**: For production with large datasets, consider:
   - Database indexing on category and searchable fields
   - Database-level pagination using LIMIT/OFFSET
   - Full-text search capabilities
   - Caching for statistics

3. **Future Enhancements**:
   - Add more filter options (price range, stock status)
   - Implement advanced search with filters
   - Add real-time statistics updates
   - Include product rating/review statistics

## 🔍 Error Handling

All endpoints include proper error handling:

- **400 Bad Request**: Invalid query parameters, missing search query
- **422 Unprocessable Entity**: Invalid pagination parameters
- **500 Internal Server Error**: Server errors during processing

## 📊 API Response Consistency

All advanced feature endpoints maintain consistent response structure:

```json
{
  "success": boolean,
  "data": array | object,
  "pagination": object (when applicable),
  "message": string (when applicable),
  "filters": object (when applicable)
}
```

This ensures predictable client-side handling and easy integration with frontend applications. 