const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const contactController = require('../controllers/contact');

router.post('/', contactController.createContact);
router.post('/import', upload.single('file'), contactController.importContacts);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
