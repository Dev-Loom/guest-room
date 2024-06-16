const roomService = require('../services/roomService');

class RoomController {
  async addRoom(req, res) {
    try {
      const room = await roomService.addRoom(req.body);
      res.status(201).json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await roomService.getRooms();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRoomById(req, res) {
    try {
      const room = await roomService.getRoomById(req.params.id);
      if (room) {
        res.json(room);
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new RoomController();
