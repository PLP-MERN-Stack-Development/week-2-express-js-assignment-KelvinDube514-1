/**
 * Custom Logger Middleware
 * Logs request method, URL, and timestamp for each incoming request
 */

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Add request start time to track response time
  req.startTime = Date.now();
  
  // Override res.end to log response time
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - req.startTime;
    console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} (${responseTime}ms)`);
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = logger; 