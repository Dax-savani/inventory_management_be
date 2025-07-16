const Invoice = require('../models/Invoice');
const Project = require('../models/Project');

// Create Invoice
exports.createInvoice = async (req, res) => {
    try {
        const {
            projectId,
            contactId,
            items,
            totalAmount,
            dueDate,
            notes
        } = req.body;

        const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const invoice = await Invoice.create({
            projectId,
            contactId,
            items,
            totalAmount,
            dueDate,
            notes,
            invoiceNumber,
            status: 'Unpaid', // Make sure default status is set if your schema requires it
        });

        // ⬇️ Update project stage to "Proposal Sent" after creating invoice
        await Project.findByIdAndUpdate(projectId, { stage: 'Proposal Sent' });

        return res.status(201).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get Invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('projectId contactId');
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        return res.status(200).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get All Invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .sort({ createdAt: -1 })
            .populate('projectId contactId');

        return res.status(200).json(invoices);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
    try {
        const updateData = req.body;
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

        // If status is updated to Paid, set paymentDate and update project stage
        if (updateData.status === 'Paid') {
            invoice.paymentDate = updateData.paymentDate || new Date();
            await invoice.save();
            await Project.findByIdAndUpdate(invoice.projectId, { stage: 'Retainer Paid' });
        }

        return res.status(200).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete Invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        return res.status(200).json({ message: 'Invoice deleted' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
