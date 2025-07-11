# 🔧 Middleware Implementation Documentation

This document explains the middleware components implemented for Task 3 of the Express.js assignment.

## 📁 Middleware Structure

```
middleware/
├── logger.js          # Custom request logging middleware
├── auth.js           # Authentication middleware
└── validation.js     # Product validation middleware
```

## 🚀 Middleware Components

### 1. Custom Logger Middleware (`middleware/logger.js`)

**Purpose**: Logs request method, URL, timestamp, and response time for all incoming requests.

**Features**:
- Logs request details: `[timestamp] METHOD /url`
- Tracks response time for performance monitoring
- Logs response status and time: `[timestamp] METHOD /url - STATUS (timeMs)`

**Usage**:
```javascript
const logger = require('./middleware/logger');
app.use(logger); // Applied globally to all routes
```

**Example Output**:
```
[2024-01-15T10:30:45.123Z] GET /api/products
[2024-01-15T10:30:45.125Z] GET /api/products - 200 (2ms)
[2024-01-15T10:30:46.000Z] POST /api/products
[2024-01-15T10:30:46.005Z] POST /api/products - 201 (5ms)
```

### 2. Authentication Middleware (`middleware/auth.js`)

**Purpose**: Validates API key in request headers for protected routes.

**Features**:
- Checks for API key in `x-api-key` or `Authorization` headers
- Supports both `x-api-key: your-key` and `Authorization: Bearer your-key` formats
- Returns 401 status for missing or invalid API keys
- Adds user information to request object for downstream middleware

**API Key**: `your-secret-api-key-123` (default for development)

**Usage**:
```javascript
const authenticate = require('./middleware/auth');

// Apply to specific routes
app.post('/api/products', authenticate, (req, res) => {
  // Route handler
});
```

**Headers Required**:
```
x-api-key: your-secret-api-key-123
```
or
```
Authorization: Bearer your-secret-api-key-123
```

**Error Response**:
```json
{
  "success": false,
  "message": "API key is required. Please provide x-api-key header or Authorization header"
}
```

### 3. Validation Middleware (`middleware/validation.js`)

**Purpose**: Validates product data for creation and update operations.

#### 3.1 Product Creation Validation (`validateCreateProduct`)

**Validates**:
- **name**: Required, minimum 2 characters, trimmed
- **description**: Required, minimum 10 characters, trimmed
- **price**: Required, must be positive number
- **category**: Required, cannot be empty, trimmed
- **inStock**: Optional, must be boolean (defaults to true)

**Usage**:
```javascript
const { validateCreateProduct } = require('./middleware/validation');

app.post('/api/products', authenticate, validateCreateProduct, (req, res) => {
  // Route handler
});
```

#### 3.2 Product Update Validation (`validateUpdateProduct`)

**Validates**:
- At least one field must be provided for update
- Same validation rules as creation for provided fields
- Allows partial updates

**Usage**:
```javascript
const { validateUpdateProduct } = require('./middleware/validation');

app.put('/api/products/:id', authenticate, validateUpdateProduct, (req, res) => {
  // Route handler
});
```

#### 3.3 Product ID Validation (`validateProductId`)

**Validates**:
- Product ID parameter is required
- Basic UUID format validation
- Supports existing sample IDs (1, 2, 3)

**Usage**:
```javascript
const { validateProductId } = require('./middleware/validation');

app.get('/api/products/:id', validateProductId, (req, res) => {
  // Route handler
});
```

**Error Response Example**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters long",
    "Description must be at least 10 characters long",
    "Price must be greater than 0"
  ]
}
```

## 🔄 Middleware Order

The middleware is applied in the following order:

1. **Global Middleware** (applied to all routes):
   - `bodyParser.json()` - Parse JSON request bodies
   - `logger` - Custom logging middleware

2. **Route-Specific Middleware** (applied per route):
   - `authenticate` - API key validation (for write operations)
   - `validateProductId` - ID parameter validation
   - `validateCreateProduct` - Product creation validation
   - `validateUpdateProduct` - Product update validation

## 🧪 Testing the Middleware

Run the test file to verify all middleware functionality:

```bash
# Start the server
npm start

# In another terminal, run the middleware tests
node test-middleware.js
```

The test file will:
1. Test authentication with and without API keys
2. Test validation with valid and invalid data
3. Test all CRUD operations with proper middleware
4. Demonstrate error handling and responses

## 📋 API Endpoints with Middleware

| Method | Endpoint | Authentication | Validation |
|--------|----------|----------------|------------|
| GET | `/api/products` | ❌ None | ❌ None |
| GET | `/api/products/:id` | ❌ None | ✅ Product ID |
| POST | `/api/products` | ✅ Required | ✅ Create Product |
| PUT | `/api/products/:id` | ✅ Required | ✅ Product ID + Update Product |
| DELETE | `/api/products/:id` | ✅ Required | ✅ Product ID |

## 🔧 Configuration

### Environment Variables

Create a `.env` file for production:

```env
API_KEY=your-production-api-key-here
PORT=3000
```

### Customizing Validation Rules

Edit `middleware/validation.js` to modify validation rules:

```javascript
// Example: Change minimum name length
if (name.trim().length < 3) { // Changed from 2 to 3
  errors.push('Name must be at least 3 characters long');
}
```

## 🚨 Error Handling

All middleware includes proper error handling:

- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Missing or invalid API key
- **404 Not Found**: Invalid product ID format
- **500 Internal Server Error**: Server errors

## 📝 Best Practices Implemented

1. **Separation of Concerns**: Each middleware has a single responsibility
2. **Reusability**: Middleware can be applied to multiple routes
3. **Error Handling**: Proper HTTP status codes and error messages
4. **Data Sanitization**: Input trimming and type validation
5. **Security**: API key authentication for write operations
6. **Logging**: Comprehensive request/response logging
7. **Validation**: Comprehensive input validation with detailed error messages

## 🔍 Debugging

To debug middleware issues:

1. Check server console for logger output
2. Verify API key in request headers
3. Review validation error messages
4. Test with `test-middleware.js` for comprehensive validation 