const jwt = require('jsonwebtoken');

// Secret key to verify JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const auth = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token provided, send 401 Unauthorized error
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify token and attach user data (userId) to the request
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;  // Attach userId to request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails, send 401 error
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
