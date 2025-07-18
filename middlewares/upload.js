// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.csv' && ext !== '.xlsx') {
        return cb(new Error('Only CSV and Excel files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
