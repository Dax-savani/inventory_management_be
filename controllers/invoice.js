const Invoice = require('../models/Invoice');

// Create invoice
exports.createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        res.status(201).json(newInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('clientId').populate('estimateId');
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single invoice
exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('clientId estimateId');
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
