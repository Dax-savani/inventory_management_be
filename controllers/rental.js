const Rental = require('../models/Rental');

// Create Rental Item
exports.createRental = async (req, res) => {
    try {
        const rental = new Rental({
            ...req.body,
            userId: req.user._id
        });

        await rental.save();
        res.status(201).json({ success: true, data: rental });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get All Rental Items
exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find().sort({ item: 1 });
        res.status(200).json({ success: true, data: rentals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get Rental Item by ID
exports.getRentalById = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).json({ success: false, message: 'Rental item not found' });

        res.status(200).json({ success: true, data: rental });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Rental Item
exports.updateRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!rental) return res.status(404).json({ success: false, message: 'Rental item not found' });

        res.status(200).json({ success: true, data: rental });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete Rental Item
exports.deleteRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndDelete(req.params.id);
        if (!rental) return res.status(404).json({ success: false, message: 'Rental item not found' });

        res.status(200).json({ success: true, message: 'Rental item deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
