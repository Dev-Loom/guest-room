const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();
class AuthService {
  async register(username, password) {
    const user = await User.create({ username, password });
    return user;
  }

  async login(username, password) {

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }
}

module.exports = new AuthService();
