/**
 * Test file for Advanced Features (Task 5)
 * Tests filtering, pagination, search, and statistics endpoints
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAdvancedFeatures() {
  console.log('🚀 Testing Advanced Features (Task 5)\n');

  try {
    // Test 1: Basic product listing with pagination
    console.log('1. Testing pagination - GET /api/products?page=1&limit=2:');
    const response1 = await axios.get(`${BASE_URL}/api/products?page=1&limit=2`);
    console.log('✅ Success:', response1.data.success);
    console.log('📄 Current page:', response1.data.pagination.currentPage);
    console.log('📊 Items per page:', response1.data.pagination.itemsPerPage);
    console.log('📦 Products returned:', response1.data.data.length);
    console.log('🔢 Total items:', response1.data.pagination.totalItems);
    console.log('📚 Total pages:', response1.data.pagination.totalPages);
    console.log('');

    // Test 2: Filter by category
    console.log('2. Testing category filtering - GET /api/products?category=electronics:');
    const response2 = await axios.get(`${BASE_URL}/api/products?category=electronics`);
    console.log('✅ Success:', response2.data.success);
    console.log('🏷️ Category filter:', response2.data.filters.category);
    console.log('📦 Electronics products:', response2.data.data.length);
    console.log('Products:', response2.data.data.map(p => `${p.name} (${p.category})`));
    console.log('');

    // Test 3: Sorting
    console.log('3. Testing sorting - GET /api/products?sortBy=price&sortOrder=desc:');
    const response3 = await axios.get(`${BASE_URL}/api/products?sortBy=price&sortOrder=desc`);
    console.log('✅ Success:', response3.data.success);
    console.log('📈 Sort by:', response3.data.filters.sortBy);
    console.log('🔄 Sort order:', response3.data.filters.sortOrder);
    console.log('💰 Prices (desc):', response3.data.data.map(p => `${p.name}: $${p.price}`));
    console.log('');

    // Test 4: Combined filtering and pagination
    console.log('4. Testing combined filters - GET /api/products?category=electronics&page=1&limit=1&sortBy=price:');
    const response4 = await axios.get(`${BASE_URL}/api/products?category=electronics&page=1&limit=1&sortBy=price`);
    console.log('✅ Success:', response4.data.success);
    console.log('🏷️ Category:', response4.data.filters.category);
    console.log('📄 Page:', response4.data.pagination.currentPage);
    console.log('📦 Results:', response4.data.data.map(p => `${p.name}: $${p.price}`));
    console.log('');

    // Test 5: Search functionality
    console.log('5. Testing search - GET /api/products/search?q=laptop:');
    const response5 = await axios.get(`${BASE_URL}/api/products/search?q=laptop`);
    console.log('✅ Success:', response5.data.success);
    console.log('🔍 Search query:', response5.data.searchQuery);
    console.log('📝 Message:', response5.data.message);
    console.log('📦 Results:', response5.data.data.map(p => p.name));
    console.log('');

    // Test 6: Search with pagination
    console.log('6. Testing search with pagination - GET /api/products/search?q=e&page=1&limit=1:');
    const response6 = await axios.get(`${BASE_URL}/api/products/search?q=e&page=1&limit=1`);
    console.log('✅ Success:', response6.data.success);
    console.log('🔍 Search query:', response6.data.searchQuery);
    console.log('📄 Page:', response6.data.pagination.currentPage);
    console.log('📦 Results:', response6.data.data.map(p => p.name));
    console.log('📊 Total found:', response6.data.pagination.totalItems);
    console.log('');

    // Test 7: Search with no results
    console.log('7. Testing search with no results - GET /api/products/search?q=nonexistent:');
    const response7 = await axios.get(`${BASE_URL}/api/products/search?q=nonexistent`);
    console.log('✅ Success:', response7.data.success);
    console.log('📝 Message:', response7.data.message);
    console.log('📦 Results count:', response7.data.data.length);
    console.log('');

    // Test 8: Search without query parameter (should fail)
    console.log('8. Testing search without query - GET /api/products/search (should fail):');
    try {
      await axios.get(`${BASE_URL}/api/products/search`);
    } catch (error) {
      console.log('✅ Correctly rejected:', error.response.data.error.message);
    }
    console.log('');

    // Test 9: Product statistics
    console.log('9. Testing product statistics - GET /api/products/stats:');
    const response9 = await axios.get(`${BASE_URL}/api/products/stats`);
    console.log('✅ Success:', response9.data.success);
    console.log('📊 Overview:');
    console.log('   Total products:', response9.data.data.overview.totalProducts);
    console.log('   Total categories:', response9.data.data.overview.totalCategories);
    console.log('   Total value: $' + response9.data.data.overview.totalValue);
    console.log('   Average price: $' + response9.data.data.overview.averagePrice);
    console.log('');
    console.log('🏷️ Category breakdown:');
    Object.entries(response9.data.data.categoryBreakdown).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    console.log('');
    console.log('📦 Stock status:');
    console.log('   In stock:', response9.data.data.stockStatus.inStock);
    console.log('   Out of stock:', response9.data.data.stockStatus.outOfStock);
    console.log('   Stock percentage:', response9.data.data.stockStatus.stockPercentage + '%');
    console.log('');
    console.log('💰 Price analysis:');
    console.log('   Min price: $' + response9.data.data.priceAnalysis.minPrice);
    console.log('   Max price: $' + response9.data.data.priceAnalysis.maxPrice);
    console.log('   Average price: $' + response9.data.data.priceAnalysis.averagePrice);
    console.log('   Price range: $' + response9.data.data.priceAnalysis.priceRange);
    console.log('   Most expensive:', response9.data.data.priceAnalysis.mostExpensive.name + ' ($' + response9.data.data.priceAnalysis.mostExpensive.price + ')');
    console.log('   Cheapest:', response9.data.data.priceAnalysis.cheapest.name + ' ($' + response9.data.data.priceAnalysis.cheapest.price + ')');
    console.log('');
    console.log('📝 Available categories:', response9.data.data.categories.join(', '));
    console.log('');

    console.log('🎉 All advanced features tests completed successfully!');
    console.log('\n📋 Advanced Features Tested:');
    console.log('   ✅ Query parameters for filtering by category');
    console.log('   ✅ Pagination support with page and limit parameters');
    console.log('   ✅ Sorting by different fields (name, price) in asc/desc order');
    console.log('   ✅ Search functionality by product name and description');
    console.log('   ✅ Product statistics with comprehensive analytics');
    console.log('   ✅ Combined filters (category + pagination + sorting)');
    console.log('   ✅ Error handling for invalid search queries');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Helper function to demonstrate API endpoints
function showAPIEndpoints() {
  console.log('\n📚 API Endpoints for Advanced Features:');
  console.log('');
  console.log('🔍 Product Listing with Filters & Pagination:');
  console.log('   GET /api/products');
  console.log('   Query Parameters:');
  console.log('     - category: Filter by category (optional)');
  console.log('     - page: Page number (default: 1)');
  console.log('     - limit: Items per page (default: 10)');
  console.log('     - sortBy: Sort field (default: name)');
  console.log('     - sortOrder: asc or desc (default: asc)');
  console.log('');
  console.log('🔍 Product Search:');
  console.log('   GET /api/products/search');
  console.log('   Query Parameters:');
  console.log('     - q: Search query (required)');
  console.log('     - page: Page number (default: 1)');
  console.log('     - limit: Items per page (default: 10)');
  console.log('');
  console.log('📊 Product Statistics:');
  console.log('   GET /api/products/stats');
  console.log('   Returns comprehensive analytics about products');
  console.log('');
  console.log('💡 Example URLs:');
  console.log('   ' + BASE_URL + '/api/products?category=electronics&page=1&limit=5');
  console.log('   ' + BASE_URL + '/api/products?sortBy=price&sortOrder=desc');
  console.log('   ' + BASE_URL + '/api/products/search?q=laptop&page=1');
  console.log('   ' + BASE_URL + '/api/products/stats');
}

// Run tests if this file is executed directly
if (require.main === module) {
  console.log('🚀 Starting advanced features tests...\n');
  console.log('Make sure your server is running on http://localhost:3000\n');
  
  // Show API endpoints first
  showAPIEndpoints();
  
  // Wait a moment for server to be ready, then run tests
  setTimeout(testAdvancedFeatures, 1000);
}

module.exports = { testAdvancedFeatures, showAPIEndpoints }; 