const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
    phone: String,
    tags: [String],
    source: String,
    notes: String,
    stage: {
        type: String,
        enum: ['Lead', 'Opportunity', 'Client'],
        default: 'Lead'
    }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
