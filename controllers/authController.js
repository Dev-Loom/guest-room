const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const { user, token } = await authService.login(username, password);

      // Set JWT token in a cookie
      res.cookie('jwt', token, { httpOnly: true });
      res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: 'Invalid username or password' });
    }
  }

  logout(req, res) {
    res.clearCookie('jwt');
    res.render('login', { message: 'Logout successful. Please log in again.' });
  }
}

module.exports = new AuthController();
