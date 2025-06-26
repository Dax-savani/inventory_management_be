const Client = require('../models/Client');

exports.createClient = async (req, res) => {
    try {
        const client = new Client({
            ...req.body,
            createdBy: req.user._id,
        });
        await client.save();
        res.status(201).json({ success: true, data: client });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};



exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find()
            .populate('createdBy', 'firstName lastName email') // customize fields
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: clients });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
            .populate('createdBy', 'firstName lastName email');

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, data: client });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, data: client });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
