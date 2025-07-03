const express = require('express');
const router = express.Router();
const {
    createEstimate,
    getEstimates,
    getEstimate,
    updateEstimate,
    deleteEstimate
} = require('../controllers/estimate');

router.post('/', createEstimate);
router.get('/', getEstimates);
router.get('/:id', getEstimate);
router.put('/:id', updateEstimate);
router.delete('/:id', deleteEstimate);

module.exports = router;
