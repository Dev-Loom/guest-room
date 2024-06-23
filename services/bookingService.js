const { Booking, Room } = require('../models');

class BookingService {
    async getBookings(location) {
        try {
            const bookings = await Booking.findAll({
                include: [{
                    model: Room,
                    where: { name: location }
                }]
            });
            return bookings;
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            throw new Error('Failed to fetch bookings');
        }
    }

    async addBooking({ location, guest_name, details, start_date, end_date }) {
        try {
            const room = await Room.findOne({ where: { name: location } });
            if (!room) {
                throw new Error('Room not found');
            }
            const booking = await Booking.create({ guest_name, details, start_date, end_date, room_id: room.id });
            return booking;
        } catch (error) {
            console.error('Failed to add booking:', error);
            throw new Error('Failed to add booking');
        }
    }

    async cancelBooking(id) {
        try {
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw new Error('Booking not found');
            }
            await booking.destroy();
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            throw new Error('Failed to cancel booking');
        }
    }
}

module.exports = new BookingService();
