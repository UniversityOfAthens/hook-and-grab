// middlewares/authMiddleware.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware/function
  }
  // User is not authenticated, respond with Unauthorized
  res.status(401).json({ message: 'Unauthorized' });
}

// Export the ensureAuthenticated middleware for use in routes
module.exports = { ensureAuthenticated };
