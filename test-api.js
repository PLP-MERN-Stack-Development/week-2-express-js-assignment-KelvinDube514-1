// test-api.js - Test script for the products API endpoints

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';
const API_KEY = 'your-secret-api-key-123';

async function testAPI() {
  console.log('🧪 Testing Products API...\n');

  try {
    // Test 1: GET all products
    console.log('1. Testing GET /api/products');
    const getAllResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Success:', getAllResponse.data);
    console.log('');

    // Test 2: GET specific product
    console.log('2. Testing GET /api/products/1');
    const getOneResponse = await axios.get(`${BASE_URL}/products/1`);
    console.log('✅ Success:', getOneResponse.data);
    console.log('');

    // Test 3: POST new product
    console.log('3. Testing POST /api/products');
    const newProduct = {
      name: 'Test Product',
      description: 'A test product for API testing',
      price: 99.99,
      category: 'test',
      inStock: true
    };
    const postResponse = await axios.post(`${BASE_URL}/products`, newProduct, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', postResponse.data);
    const newProductId = postResponse.data.data.id;
    console.log('');

    // Test 4: PUT update product
    console.log('4. Testing PUT /api/products/' + newProductId);
    const updateData = {
      name: 'Updated Test Product',
      price: 149.99
    };
    const putResponse = await axios.put(`${BASE_URL}/products/${newProductId}`, updateData, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', putResponse.data);
    console.log('');

    // Test 5: DELETE product
    console.log('5. Testing DELETE /api/products/' + newProductId);
    const deleteResponse = await axios.delete(`${BASE_URL}/products/${newProductId}`, {
      headers: { 'x-api-key': API_KEY }
    });
    console.log('✅ Success:', deleteResponse.data);
    console.log('');

    // Test 6: GET all products after deletion
    console.log('6. Testing GET /api/products (after deletion)');
    const finalResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Success:', finalResponse.data);
    console.log('');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests
testAPI(); 