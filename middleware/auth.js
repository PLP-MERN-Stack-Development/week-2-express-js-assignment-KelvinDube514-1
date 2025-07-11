/**
 * Authentication Middleware
 * Checks for API key in request headers
 */

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  
  // For development purposes, using a simple API key
  // In production, this should be stored in environment variables
  const validApiKey = process.env.API_KEY || 'your-secret-api-key-123';
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required. Please provide x-api-key header or Authorization header'
    });
  }
  
  // Remove 'Bearer ' prefix if present
  const cleanApiKey = apiKey.replace('Bearer ', '');
  
  if (cleanApiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key'
    });
  }
  
  // Add user info to request object (in a real app, this would be decoded from JWT)
  req.user = {
    id: 'user-123',
    role: 'admin'
  };
  
  next();
};

module.exports = authenticate; 