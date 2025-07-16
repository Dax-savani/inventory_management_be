const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        description: String,
        quantity: Number,
        unitPrice: Number,
        total: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Unpaid', 'Paid', 'Overdue'],
        default: 'Unpaid'
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    notes: String,
    paymentDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
