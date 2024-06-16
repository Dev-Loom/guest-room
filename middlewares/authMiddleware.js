// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).render('unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).render('unauthorized');
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
