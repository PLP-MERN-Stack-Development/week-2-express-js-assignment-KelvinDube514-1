// server.js - Starter Express server for Week 2 assignment

// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Import custom middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const { validateCreateProduct, validateUpdateProduct, validateProductId } = require('./middleware/validation');
const { 
  asyncHandler, 
  errorHandler, 
  notFoundHandler,
  NotFoundError,
  ValidationError 
} = require('./middleware/errors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(logger); // Custom logger middleware

// Root route - Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// RESTful API Routes for Products

// GET /api/products - Get all products with filtering and pagination
app.get('/api/products', asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
  
  // Filter products by category if provided
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Sort products
  filteredProducts.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle different data types
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
  
  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Pagination metadata
  const pagination = {
    currentPage: pageNum,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
    totalItems: filteredProducts.length,
    itemsPerPage: limitNum,
    hasNextPage: endIndex < filteredProducts.length,
    hasPrevPage: pageNum > 1
  };
  
  res.status(200).json({
    success: true,
    data: paginatedProducts,
    pagination,
    filters: {
      ...(category && { category }),
      sortBy,
      sortOrder
    }
  });
}));

// GET /api/products/search - Search products by name
app.get('/api/products/search', asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  if (!q || q.trim() === '') {
    throw new ValidationError('Search query (q) is required');
  }
  
  // Search products by name (case-insensitive)
  const searchQuery = q.toLowerCase();
  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)
  );
  
  // Pagination for search results
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  
  const paginatedResults = searchResults.slice(startIndex, endIndex);
  
  // Pagination metadata
  const pagination = {
    currentPage: pageNum,
    totalPages: Math.ceil(searchResults.length / limitNum),
    totalItems: searchResults.length,
    itemsPerPage: limitNum,
    hasNextPage: endIndex < searchResults.length,
    hasPrevPage: pageNum > 1
  };
  
  res.status(200).json({
    success: true,
    data: paginatedResults,
    pagination,
    searchQuery: q,
    message: `Found ${searchResults.length} product(s) matching "${q}"`
  });
}));

// GET /api/products/stats - Get product statistics
app.get('/api/products/stats', asyncHandler(async (req, res) => {
  // Count by category
  const categoryStats = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  // Stock statistics
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;
  
  // Price statistics
  const prices = products.map(p => p.price);
  const totalValue = prices.reduce((sum, price) => sum + price, 0);
  const averagePrice = prices.length > 0 ? totalValue / prices.length : 0;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Most expensive and cheapest products
  const mostExpensive = products.find(p => p.price === maxPrice);
  const cheapest = products.find(p => p.price === minPrice);
  
  // Categories list
  const categories = [...new Set(products.map(p => p.category))];
  
  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalValue: parseFloat(totalValue.toFixed(2)),
        averagePrice: parseFloat(averagePrice.toFixed(2))
      },
      categoryBreakdown: categoryStats,
      stockStatus: {
        inStock: inStockCount,
        outOfStock: outOfStockCount,
        stockPercentage: parseFloat(((inStockCount / products.length) * 100).toFixed(2))
      },
      priceAnalysis: {
        minPrice,
        maxPrice,
        averagePrice: parseFloat(averagePrice.toFixed(2)),
        priceRange: maxPrice - minPrice,
        mostExpensive: {
          name: mostExpensive?.name,
          price: mostExpensive?.price
        },
        cheapest: {
          name: cheapest?.name,
          price: cheapest?.price
        }
      },
      categories: categories.sort()
    }
  });
}));

// GET /api/products/:id - Get a specific product by ID
app.get('/api/products/:id', validateProductId, asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.status(200).json({
    success: true,
    data: product
  });
}));

// POST /api/products - Create a new product
app.post('/api/products', authenticate, validateCreateProduct, asyncHandler(async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock: inStock !== undefined ? inStock : true
  };
  products.push(newProduct);
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
}));

// PUT /api/products/:id - Update an existing product
app.put('/api/products/:id', authenticate, validateProductId, validateUpdateProduct, asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  const updatedProduct = {
    ...products[productIndex],
    ...(name && { name }),
    ...(description && { description }),
    ...(price !== undefined && { price }),
    ...(category && { category }),
    ...(inStock !== undefined && { inStock })
  };
  products[productIndex] = updatedProduct;
  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct
  });
}));

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', authenticate, validateProductId, asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct
  });
}));

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Implementation completed:
// ✅ Task 3: Middleware Implementation
//   - Request logging - Custom logger middleware logs method, URL, and timestamp
//   - Authentication - API key validation middleware
//   - Validation - Product creation and update validation middleware
// ✅ Task 4: Error Handling
//   - Global error handling middleware with custom error classes
//   - Proper error responses with appropriate HTTP status codes
//   - Async error handling using asyncHandler wrapper function
// ✅ Task 5: Advanced Features
//   - Query parameters for filtering products by category
//   - Pagination support for product listing endpoint
//   - Search endpoint for searching products by name and description
//   - Statistics endpoint for comprehensive product analytics

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 