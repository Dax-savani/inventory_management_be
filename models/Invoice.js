const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    estimateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Estimate' },
    amount: Number,
    status: { type: String, default: 'Unpaid' }, // Unpaid, Partial, Paid
    dueDate: Date,
    paymentDate: Date,
    paymentMethod: String,
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
