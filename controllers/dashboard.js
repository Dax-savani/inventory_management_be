const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Invoice = require('../models/Invoice');

// Get dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        // 1. Get all contacts with status "Lead"
        const leads = await Contact.find({ status: 'Lead' });

        // 2. Get all scheduled projects (with a start date/time)
        const scheduledProjects = await Project.find({
            $or: [
                { startDate: { $ne: null } },
                { startTime: { $ne: null } }
            ]
        }).populate('contact', 'fullName email');

        // 3. Get recent notes from clients (sorted by updatedAt, limited to 10)
        const clientsWithNotes = await Contact.find({
            additionalInfo: { $exists: true, $ne: '' }
        })
            .select('fullName email additionalInfo updatedAt')
            .sort({ updatedAt: -1 });

        // 4. Calculate total earnings in current year from Paid invoices
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

        const totalEarningsAgg = await Invoice.aggregate([
            {
                $match: {
                    status: 'Paid',
                    paymentDate: {
                        $gte: startOfYear,
                        $lt: endOfYear
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalEarnings = totalEarningsAgg.length > 0 ? totalEarningsAgg[0].total : 0;

        res.status(200).json({
            success: true,
            data: {
                leads,
                scheduledProjects,
                notes: clientsWithNotes,
                totalEarnings
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

