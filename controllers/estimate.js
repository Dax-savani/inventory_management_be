const Estimate = require('../models/Estimate');

// Create estimate
exports.createEstimate = async (req, res) => {
    try {
        const newEstimate = await Estimate.create(req.body);
        res.status(201).json(newEstimate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all estimates
exports.getEstimates = async (req, res) => {
    try {
        const estimates = await Estimate.find().populate('clientId');
        res.status(200).json(estimates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single estimate
exports.getEstimate = async (req, res) => {
    try {
        const estimate = await Estimate.findById(req.params.id).populate('clientId');
        if (!estimate) return res.status(404).json({ message: 'Estimate not found' });
        res.status(200).json(estimate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update estimate
exports.updateEstimate = async (req, res) => {
    try {
        const estimate = await Estimate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!estimate) return res.status(404).json({ message: 'Estimate not found' });
        res.status(200).json(estimate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete estimate
exports.deleteEstimate = async (req, res) => {
    try {
        const estimate = await Estimate.findByIdAndDelete(req.params.id);
        if (!estimate) return res.status(404).json({ message: 'Estimate not found' });
        res.status(200).json({ message: 'Estimate deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
