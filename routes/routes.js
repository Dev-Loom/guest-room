// routes.js

const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');
const roomController = require('../controllers/roomController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/', (req, res) => { res.render('login'); });
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);

// Protected routes
router.get('/dashboard', authenticateToken, (req, res) => { res.render('dashboard', { user: req.user })});

router.post('/addRooms', authenticateToken, roomController.addRoom);
router.get('/getAllRooms', authenticateToken, roomController.getRooms);
router.get('/getBookings', authenticateToken, bookingController.getBookings);
router.post('/addBooking', authenticateToken, bookingController.addBooking);
router.delete('/cancelBooking/:id', authenticateToken, bookingController.cancelBooking);

module.exports = router;
