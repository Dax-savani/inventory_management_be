const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./middlewares/auth');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/client');
const eventRoutes = require('./routes/event');
const serviceRoutes = require('./routes/service');
const rentalRoutes = require('./routes/rental');
const leadRoutes = require('./routes/lead');
const estimateRoutes = require('./routes/estimate');
const invoiceRoutes = require('./routes/invoice');
const contactRoutes = require('./routes/contact');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/client',auth, clientRoutes);
app.use('/api/event',auth, eventRoutes);
app.use('/api/service',auth, serviceRoutes);
app.use('/api/rental',auth, rentalRoutes);
app.use('/api/leads',auth, leadRoutes);
app.use('/api/estimates',auth, estimateRoutes);
app.use('/api/invoices',auth, invoiceRoutes);
app.use('/api/contact', auth, contactRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Inventory Management API is running');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
