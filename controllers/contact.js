const Contact = require('../models/Contact');

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({success: true, data: newContact});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error creating contact', error: error.message});
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: contacts});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error fetching contacts', error: error.message});
    }
};

// Get single contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({success: false, message: 'Contact not found'});
        }
        res.status(200).json({success: true, data: contact});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error fetching contact', error: error.message});
    }
};

// Update contact
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!updatedContact) {
            return res.status(404).json({success: false, message: 'Contact not found'});
        }
        res.status(200).json({success: true, data: updatedContact});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error updating contact', error: error.message});
    }
};

// Delete contact
exports.deleteContact = async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({success: false, message: 'Contact not found'});
        }
        res.status(200).json({success: true, message: 'Contact deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error deleting contact', error: error.message});
    }
};
