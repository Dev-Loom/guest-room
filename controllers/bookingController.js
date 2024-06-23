const BookingService = require('../services/BookingService');

class BookingController {
    async getBookings(req, res) {
        const { location } = req.query;
        try {
            const bookings = await BookingService.getBookings(location);
            res.json(bookings);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async addBooking(req, res) {
        const { location, guest_name, start_date, end_date } = req.body;
        try {
            const booking = await BookingService.addBooking({ location, guest_name, start_date, end_date });
            res.status(201).json(booking);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async cancelBooking(req, res) {
        const { id } = req.params;
        try {
            await BookingService.cancelBooking(id);
            res.status(204).json();
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BookingController();
