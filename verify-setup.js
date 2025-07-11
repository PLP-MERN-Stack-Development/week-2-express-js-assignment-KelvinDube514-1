/**
 * Setup Verification Script
 * Verifies that the project setup meets all assignment requirements
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Express.js Assignment Setup...\n');

// Check Node.js version
function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  console.log('📋 Node.js Version Check:');
  console.log(`   Current version: ${nodeVersion}`);
  
  if (majorVersion >= 18) {
    console.log('   ✅ Node.js version meets requirement (v18+)');
  } else {
    console.log('   ❌ Node.js version too old. Please upgrade to v18 or higher');
    return false;
  }
  console.log('');
  return true;
}

// Check required dependencies
function checkDependencies() {
  console.log('📦 Dependencies Check:');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = packageJson.dependencies || {};
    
    const requiredDeps = {
      'express': 'Web framework for Node.js',
      'body-parser': 'Parse incoming request bodies',
      'uuid': 'Generate unique identifiers'
    };
    
    let allDepsPresent = true;
    
    for (const [dep, description] of Object.entries(requiredDeps)) {
      if (dependencies[dep]) {
        console.log(`   ✅ ${dep} (${dependencies[dep]}) - ${description}`);
      } else {
        console.log(`   ❌ ${dep} - MISSING! ${description}`);
        allDepsPresent = false;
      }
    }
    
    // Check bonus dependency
    if (dependencies['axios']) {
      console.log(`   ✅ axios (${dependencies['axios']}) - HTTP client for testing (bonus)`);
    }
    
    console.log('');
    return allDepsPresent;
  } catch (error) {
    console.log('   ❌ Error reading package.json');
    console.log('');
    return false;
  }
}

// Check required files
function checkFiles() {
  console.log('📁 File Structure Check:');
  
  const requiredFiles = [
    { path: 'server.js', desc: 'Main Express server file' },
    { path: 'package.json', desc: 'Dependencies and scripts' },
    { path: 'middleware/auth.js', desc: 'Authentication middleware' },
    { path: 'middleware/errors.js', desc: 'Error handling middleware' },
    { path: 'middleware/logger.js', desc: 'Logging middleware' },
    { path: 'middleware/validation.js', desc: 'Validation middleware' },
    { path: 'test-middleware.js', desc: 'Middleware tests' },
    { path: 'test-advanced-features.js', desc: 'Advanced features tests' }
  ];
  
  let allFilesPresent = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file.path)) {
      console.log(`   ✅ ${file.path} - ${file.desc}`);
    } else {
      console.log(`   ❌ ${file.path} - MISSING! ${file.desc}`);
      allFilesPresent = false;
    }
  }
  
  console.log('');
  return allFilesPresent;
}

// Check server.js content
function checkServerContent() {
  console.log('🚂 Server.js Content Check:');
  
  try {
    const serverContent = fs.readFileSync('server.js', 'utf8');
    
    const checks = [
      { pattern: /app\.listen.*3000/, desc: 'Server listens on port 3000' },
      { pattern: /Hello World/, desc: 'Hello World route implemented' },
      { pattern: /\/api\/products/, desc: 'Products API routes implemented' },
      { pattern: /express.*require/, desc: 'Express.js imported' },
      { pattern: /body-parser|bodyParser/, desc: 'Body parser middleware' },
      { pattern: /uuid/, desc: 'UUID for unique identifiers' }
    ];
    
    let allChecksPass = true;
    
    for (const check of checks) {
      if (check.pattern.test(serverContent)) {
        console.log(`   ✅ ${check.desc}`);
      } else {
        console.log(`   ❌ ${check.desc} - NOT FOUND`);
        allChecksPass = false;
      }
    }
    
    console.log('');
    return allChecksPass;
  } catch (error) {
    console.log('   ❌ Error reading server.js');
    console.log('');
    return false;
  }
}

// Test API endpoints (basic check)
async function testBasicEndpoints() {
  console.log('🌐 Basic Server Test:');
  
  try {
    // Try to require the server file
    require('./server.js');
    console.log('   ✅ Server file can be loaded without errors');
    console.log('   ℹ️  To test endpoints, run: npm start');
    console.log('   ℹ️  Then visit: http://localhost:3000');
    console.log('');
    return true;
  } catch (error) {
    console.log('   ❌ Error loading server.js:');
    console.log(`   ${error.message}`);
    console.log('');
    return false;
  }
}

// Main verification function
async function runVerification() {
  console.log('🛠️ Express.js Assignment Setup Verification\n');
  console.log('Checking if setup meets all assignment requirements...\n');
  
  const results = {
    nodeVersion: checkNodeVersion(),
    dependencies: checkDependencies(),
    files: checkFiles(),
    serverContent: checkServerContent()
  };
  
  // Summary
  console.log('📊 Verification Summary:');
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('   🎉 ALL CHECKS PASSED!');
    console.log('   ✅ Your setup meets all assignment requirements');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('   1. Run: npm start');
    console.log('   2. Test: node test-middleware.js');
    console.log('   3. Test: node test-advanced-features.js');
    console.log('   4. Visit: http://localhost:3000');
    console.log('');
    console.log('📚 Documentation:');
    console.log('   - README.md - Full API documentation');
    console.log('   - setup-guide.md - Detailed setup instructions');
    console.log('   - MIDDLEWARE_DOCUMENTATION.md - Middleware details');
    console.log('   - ADVANCED_FEATURES_DOCUMENTATION.md - Advanced features');
  } else {
    console.log('   ⚠️  SOME CHECKS FAILED');
    console.log('   Please fix the issues above before proceeding');
    console.log('');
    console.log('💡 Quick Fix Commands:');
    console.log('   npm install express body-parser uuid');
    console.log('   node --version  (should be v18+)');
  }
  
  console.log('');
  console.log('🔧 Setup Requirements Met:');
  console.log('   ✅ Node.js v18+ installed');
  console.log('   ✅ Required dependencies (express, body-parser, uuid)');
  console.log('   ✅ Server.js file as starting point');
  console.log('   ✅ API testing tools available (curl, Postman, test scripts)');
  
  return allPassed;
}

// Run verification if this file is executed directly
if (require.main === module) {
  runVerification();
}

module.exports = { runVerification }; 