# 🛠️ Setup Guide - Week 2 Express.js Assignment

This guide will help you set up and run the Express.js RESTful API assignment.

## 📋 Prerequisites

### 1. Node.js Installation
- **Required Version**: Node.js v18 or higher (recommended)
- **Current Version**: v22.16.0 ✅
- **Check your version**: `node --version`
- **Download**: [nodejs.org](https://nodejs.org/)

If you need to update Node.js:
- Windows: Download from nodejs.org
- macOS: Use Homebrew `brew install node` or download from nodejs.org
- Linux: Use your package manager or download from nodejs.org

## 🚀 Quick Start

### Step 1: Project Setup
Use the provided `server.js` file as a starting point (already implemented with full functionality).

### Step 2: Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install express body-parser uuid
```

**Dependencies installed:**
- `express`: ^5.1.0 - Web framework for Node.js
- `body-parser`: ^2.2.0 - Parse incoming request bodies
- `uuid`: ^11.1.0 - Generate unique identifiers
- `axios`: ^1.6.0 - HTTP client for testing (bonus)

### Step 3: Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
Server is running on http://localhost:3000
```

## 🧪 Testing Your API

### Option 1: Provided Test Scripts
```bash
# Test middleware functionality
node test-middleware.js

# Test advanced features
node test-advanced-features.js
```

### Option 2: Postman
1. Open Postman
2. Create a new collection called "Express.js API"
3. Add requests for each endpoint:
   - GET `http://localhost:3000/`
   - GET `http://localhost:3000/api/products`
   - POST `http://localhost:3000/api/products` (with API key header)
   - GET `http://localhost:3000/api/products/search?q=laptop`
   - GET `http://localhost:3000/api/products/stats`

### Option 3: Insomnia
Similar to Postman, create requests for each endpoint with proper headers.

### Option 4: curl Commands
```bash
# Basic test
curl http://localhost:3000/

# Get all products
curl http://localhost:3000/api/products

# Get products with pagination
curl "http://localhost:3000/api/products?page=1&limit=2"

# Filter by category
curl "http://localhost:3000/api/products?category=electronics"

# Search products
curl "http://localhost:3000/api/products/search?q=laptop"

# Get statistics
curl http://localhost:3000/api/products/stats

# Create product (requires API key)
curl -X POST http://localhost:3000/api/products \
  -H "x-api-key: your-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product",
    "price": 99.99,
    "category": "test",
    "inStock": true
  }'
```

## 🔑 API Authentication

For write operations (POST, PUT, DELETE), include the API key:

**Header Option 1:**
```
x-api-key: your-secret-api-key-123
```

**Header Option 2:**
```
Authorization: Bearer your-secret-api-key-123
```

## 📊 Sample Data

The server comes pre-loaded with sample products:

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  },
  {
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 800,
    "category": "electronics",
    "inStock": true
  },
  {
    "id": "3",
    "name": "Coffee Maker",
    "description": "Programmable coffee maker with timer",
    "price": 50,
    "category": "kitchen",
    "inStock": false
  }
]
```

## 🔧 Project Structure Verification

Ensure your project has the following structure:

```
week-2-express-js-assignment-KelvinDube514-1/
├── server.js                    # ✅ Main server file
├── package.json                 # ✅ Dependencies
├── middleware/
│   ├── auth.js                  # ✅ Authentication
│   ├── errors.js                # ✅ Error handling
│   ├── logger.js                # ✅ Request logging
│   └── validation.js            # ✅ Input validation
├── test-middleware.js           # ✅ Middleware tests
├── test-advanced-features.js    # ✅ Advanced feature tests
└── README.md                    # ✅ Documentation
```

## ⚡ Quick Verification

After setup, verify everything works:

1. **Server starts**: `npm start` shows server running message
2. **Basic endpoint**: Visit `http://localhost:3000/` in browser (should show "Hello World!")
3. **API endpoint**: Visit `http://localhost:3000/api/products` (should return JSON with products)
4. **Run tests**: `node test-advanced-features.js` (should pass all tests)

## 🐛 Troubleshooting

### Common Issues:

**Issue**: `npm install` fails
- **Solution**: Ensure Node.js v18+ is installed
- **Check**: `node --version` and `npm --version`

**Issue**: Server won't start
- **Solution**: Check if port 3000 is already in use
- **Alternative**: Set PORT environment variable: `PORT=3001 npm start`

**Issue**: API key authentication fails
- **Solution**: Ensure header is exactly: `x-api-key: your-secret-api-key-123`

**Issue**: Tests fail
- **Solution**: Make sure server is running first: `npm start`

### Getting Help:

1. Check the console for error messages
2. Verify all dependencies are installed: `npm list`
3. Ensure you're using the correct API endpoints and headers
4. Review the comprehensive documentation in README.md

## 🎯 Next Steps

After setup is complete:

1. Test all CRUD operations
2. Explore filtering and pagination features
3. Try the search functionality
4. Check out the statistics endpoint
5. Review the middleware implementation
6. Understand the error handling

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [RESTful API Design](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

**Ready to go!** Your Express.js RESTful API is now set up and ready for testing. 🚀 