const express = require('express');
const router = express.Router();
const {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead, convertLeadToClient
} = require('../controllers/lead');

router.post('/', createLead);
router.get('/', getLeads);
router.post('/:id/convert', convertLeadToClient);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
