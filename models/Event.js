const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true,
        trim: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Planned', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Planned'
    },
    services: [
        {
            name: String,
            description: String,
            cost: Number
        }
    ],
    rentals: [
        {
            item: String,
            quantity: Number,
            cost: Number
        }
    ],
    teamNotes: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
