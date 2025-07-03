const Lead = require('../models/Lead');

// Create lead
exports.createLead = async (req, res) => {
    try {
        const newLead = await Lead.create({ ...req.body, userId: req.user._id });
        res.status(201).json(newLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all leads of a user
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ userId: req.user._id });
        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single lead
exports.getLead = async (req, res) => {
    try {
        const lead = await Lead.findOne({ _id: req.params.id, userId: req.user._id });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.status(200).json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.convertLeadToClient = async (req, res) => {
    try {
        const lead = await Lead.findOne({ _id: req.params.id, userId: req.user._id });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        // Check if a client with same phone or email already exists
        const existingClient = await Client.findOne({
            $or: [
                { email: lead.email },
                { phoneNumber: lead.phone }
            ],
            userId: req.user._id
        });

        if (existingClient) {
            return res.status(400).json({ message: 'Client with same email or phone already exists' });
        }

        // Create new client
        const newClient = await Client.create({
            clientName: lead.name,
            email: lead.email,
            phoneNumber: lead.phone,
            notes: lead.notes,
            userId: req.user._id
        });

        lead.stage = 'Client';
        await lead.save();

        res.status(201).json({
            message: 'Lead converted to client successfully',
            client: newClient
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update lead
exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.status(200).json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete lead
exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.status(200).json({ message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
