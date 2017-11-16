const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Skip auth for session creation routes
  if (req.path === '/signup' || req.path === '/signin') {
    return next();
  }
  // Authenticate
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }
    return next();
  });
};
