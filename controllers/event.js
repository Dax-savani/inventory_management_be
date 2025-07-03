const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            userId: req.user._id
        });

        await event.save();
        res.status(201).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('clientId', 'clientName email phoneNumber').populate('userId', 'firstName lastName email')
            .sort({ eventDate: 1 });

        res.status(200).json({ success: true, data: events });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('clientId', 'clientName email phoneNumber').populate('userId', 'firstName lastName email');

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, data: event });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
