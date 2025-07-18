const csvParser = require('csv-parser');
const XLSX = require('xlsx');
const Contact = require('../models/Contact');
const { Readable } = require('stream');

const formatContact = (row) => ({
    fullName: row.fullName || '',
    email: row.email || '',
    contact: row.contact || '',
    lastInteraction: row.lastInteraction ? new Date(row.lastInteraction) : undefined,
    website: row.website || '',
    organization: row.organization || '',
    jobTitle: row.jobTitle || '',
    mailingEmail: row.mailingEmail || '',
    additionalInfo: row.additionalInfo || '',
    tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
    status: row.status || 'Lead'
});

exports.importContacts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const buffer = req.file.buffer;
        const ext = req.file.originalname.split('.').pop();

        let contacts = [];

        if (ext === 'csv') {
            const stream = Readable.from(buffer);
            stream
                .pipe(csvParser())
                .on('data', (row) => contacts.push(formatContact(row)))
                .on('end', async () => {
                    const saved = await Contact.insertMany(contacts);
                    res.status(200).json({ success: true, count: saved.length, data: saved });
                })
                .on('error', (error) => {
                    res.status(500).json({ success: false, message: 'Error parsing CSV', error: error.message });
                });
        } else if (ext === 'xlsx') {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            contacts = jsonData.map(formatContact);

            const saved = await Contact.insertMany(contacts);
            res.status(200).json({ success: true, count: saved.length, data: saved });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid file format' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error importing contacts', error: error.message });
    }
};

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
