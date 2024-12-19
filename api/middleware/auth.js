
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const authenticateToken = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Missing JWT token' });
  }

  
  await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
