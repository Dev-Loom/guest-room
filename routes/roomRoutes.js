const express = require('express');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, roomController.addRoom);
router.get('/', authMiddleware, roomController.getRooms);
router.get('/:id', authMiddleware, roomController.getRoomById);

module.exports = router;
