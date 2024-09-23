
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  // console.log('Authorization Header:', token);
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Extract the token part from "Bearer <token>"
    const actualToken = token.split(' ')[1];

    // Verify the token using your secret key
    const decoded = jwt.verify(actualToken, 'your_jwt_secret');
    
    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = auth;
