const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    lastInteraction: {
        type: Date,
        set: val => {
            const date = new Date(val);
            return isNaN(date.getTime()) ? undefined : date;
        }
    },
    website: {
        type: String,
        trim: true
    },
    organization: {
        type: String,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    },
    mailingEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    additionalInfo: {
        type: String,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['Lead', 'Contacted', 'Engaged', 'Client', 'Inactive', 'Lost'],
        default: 'Lead'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);
