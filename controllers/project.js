const Project = require('../models/Project');
const Contact = require('../models/Contact');

const stageToStatusMap = {
    'Inquiry': 'Lead',
    'Questionnaire Sent': 'Contacted',
    'Follow Up': 'Contacted',
    'Brochure sent': 'Engaged',
    'Consult': 'Engaged',
    'Proposal Sent': 'Engaged',
    'Proposal Signed': 'Client',
    'Retainer': 'Client'
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { contact, stage } = req.body;

        // Create project
        const project = new Project(req.body);
        const savedProject = await project.save();

        // Update contact status if contact ID and stage are provided
        if (contact && stage && stageToStatusMap[stage]) {
            await Contact.findByIdAndUpdate(contact, {
                status: stageToStatusMap[stage]
            });
        }

        res.status(201).json({ success: true, data: savedProject });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('contact');
        res.status(200).json({success: true, data:projects});
    } catch (error) {
        res.status(500).json({success: false,  error: error.message });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('contact');
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({success: true,data:project});
    } catch (error) {
        res.status(500).json({success: false,  error: error.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Sync contact status if stage is updated
        const { stage, contact } = req.body;
        if (stage && contact && stageToStatusMap[stage]) {
            await Contact.findByIdAndUpdate(contact, {
                status: stageToStatusMap[stage]
            });
        }

        res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true,  message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({success: false, error: error.message });
    }
};
