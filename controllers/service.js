const Service = require('../models/Service');

// Create Service
exports.createService = async (req, res) => {
    try {
        const service = new Service({
            ...req.body,
            userId: req.user._id
        });

        await service.save();
        res.status(201).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ name: 1 });
        res.status(200).json({ success: true, data: services });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get Single Service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Service
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        res.status(200).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete Service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
