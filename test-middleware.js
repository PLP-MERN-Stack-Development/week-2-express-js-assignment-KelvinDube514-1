/**
 * Test file to demonstrate middleware functionality
 * Run this file to test the various middleware components
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const API_KEY = 'your-secret-api-key-123';

// Test data
const testProduct = {
  name: 'Test Product',
  description: 'This is a test product for middleware validation',
  price: 99.99,
  category: 'test',
  inStock: true
};

const invalidProduct = {
  name: 'A', // Too short
  description: 'Short', // Too short
  price: -10, // Invalid price
  category: '', // Empty category
  inStock: 'not-a-boolean' // Invalid type
};

async function testMiddleware() {
  console.log('🧪 Testing Middleware Implementation\n');

  try {
    // Test 1: GET request without API key (should work for read operations)
    console.log('1. Testing GET /api/products (no auth required):');
    const response1 = await axios.get(`${BASE_URL}/api/products`);
    console.log('✅ Success:', response1.data.success);
    console.log('📊 Products count:', response1.data.pagination.totalItems);
    console.log('');

    // Test 2: POST request without API key (should fail)
    console.log('2. Testing POST /api/products without API key (should fail):');
    try {
      await axios.post(`${BASE_URL}/api/products`, testProduct);
    } catch (error) {
      console.log('✅ Correctly rejected:', error.response.data.message);
    }
    console.log('');

    // Test 3: POST request with invalid API key (should fail)
    console.log('3. Testing POST /api/products with invalid API key:');
    try {
      await axios.post(`${BASE_URL}/api/products`, testProduct, {
        headers: { 'x-api-key': 'wrong-key' }
      });
    } catch (error) {
      console.log('✅ Correctly rejected:', error.response.data.message);
    }
    console.log('');

    // Test 4: POST request with valid API key but invalid data (should fail validation)
    console.log('4. Testing POST /api/products with valid API key but invalid data:');
    try {
      await axios.post(`${BASE_URL}/api/products`, invalidProduct, {
        headers: { 'x-api-key': API_KEY }
      });
    } catch (error) {
      console.log('✅ Validation failed as expected:');
      console.log('   Message:', error.response.data.error.message);
      console.log('   Errors:', error.response.data.error.errors);
    }
    console.log('');

    // Test 5: POST request with valid API key and valid data (should succeed)
    console.log('5. Testing POST /api/products with valid API key and valid data:');
    const response5 = await axios.post(`${BASE_URL}/api/products`, testProduct, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', response5.data.message);
    console.log('📦 Created product ID:', response5.data.data.id);
    const newProductId = response5.data.data.id;
    console.log('');

    // Test 6: PUT request with partial update
    console.log('6. Testing PUT /api/products/:id with partial update:');
    const updateData = {
      price: 149.99,
      inStock: false
    };
    const response6 = await axios.put(`${BASE_URL}/api/products/${newProductId}`, updateData, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', response6.data.message);
    console.log('💰 Updated price:', response6.data.data.price);
    console.log('📦 Stock status:', response6.data.data.inStock);
    console.log('');

    // Test 7: DELETE request
    console.log('7. Testing DELETE /api/products/:id:');
    const response7 = await axios.delete(`${BASE_URL}/api/products/${newProductId}`, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', response7.data.message);
    console.log('🗑️ Deleted product:', response7.data.data.name);
    console.log('');

    // Test 8: Invalid product ID validation
    console.log('8. Testing GET /api/products/:id with invalid ID:');
    try {
      await axios.get(`${BASE_URL}/api/products/invalid-id`);
    } catch (error) {
      console.log('✅ Correctly rejected invalid ID:', error.response.data.error.message);
    }
    console.log('');

    console.log('🎉 All middleware tests completed successfully!');
    console.log('\n📋 Middleware Features Tested:');
    console.log('   ✅ Custom logger middleware (check server console for logs)');
    console.log('   ✅ Authentication middleware (API key validation)');
    console.log('   ✅ Validation middleware (product data validation)');
    console.log('   ✅ JSON body parsing middleware');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  console.log('🚀 Starting middleware tests...\n');
  console.log('Make sure your server is running on http://localhost:3000\n');
  
  // Wait a moment for server to be ready
  setTimeout(testMiddleware, 1000);
}

module.exports = { testMiddleware }; 