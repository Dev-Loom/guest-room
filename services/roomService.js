const { Room } = require('../models');

class RoomService {
  async addRoom(details) {
    const room = await Room.create(details);
    return room;
  }

  async getRooms() {
    const rooms = await Room.findAll();
    return rooms;
  }

  async getRoomById(id) {
    const room = await Room.findByPk(id);
    return room;
  }
}

module.exports = new RoomService();
