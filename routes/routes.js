const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.get('/', (req, res) => { res.render('login');});
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/dashboard', authenticateToken, (req, res) => {res.render('dashboard', { user: req.user });});

module.exports = router;
