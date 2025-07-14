const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    items: [
        {
            name: String,
            description: String,
            quantity: Number,
            unitPrice: Number,
        }
    ],
    tax: Number,
    total: Number,
    status: { type: String, default: 'Draft' },
}, { timestamps: true });

module.exports = mongoose.model('Estimate', estimateSchema);
