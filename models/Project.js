const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Wedding', 'Baby Shower', 'Corporate', 'Design', 'Event', 'Family', 'Other', 'Party', 'Social'],
        default: 'Wedding'
    },
    leadSource: {
        type: String,
        enum: ['Client Referral', 'Facebook', 'Google', 'Instagram', 'Other', 'Personal Website', 'The Knot', 'Unknown', 'Vendor Referral', 'Yelp'],
        default: null
    },
    stage: {
        type: String,
        required: true,
        enum: ['Inquiry', 'Questionnaire Sent', 'Follow Up', 'Brochure sent', 'Consult', 'Proposal Sent', 'Proposal Signed', 'Retainer'],
        default: 'Inquiry'
    },
    timezone: {
        type: String,
        enum: ['PDT/PST', 'MDT/MST', 'MST', 'EDT/EST', 'CDT/CST', 'CST', 'HST', 'AKDT/AKST', 'AST', 'ADT/AST', 'NST/NDT'],
        default: 'PDT/PST'
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    startTime: {
        type: String,
        default: null
    },
    endTime: {
        type: String,
        default: null
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
