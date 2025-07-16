const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice');

router.post('/', invoiceController.createInvoice);
router.get('/:id', invoiceController.getInvoiceById);
// router.put('/status/:id', invoiceController.updateInvoiceStatus);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;