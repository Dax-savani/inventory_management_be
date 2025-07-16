const express = require('express');
const router = express.Router();
const authRoutes = require("./auth");
const auth = require("../middlewares/auth");
const clientRoutes = require("./client");
const dashboardRoutes = require("./dashboard");
const eventRoutes = require("./event");
const serviceRoutes = require("./service");
const rentalRoutes = require("./rental");
const leadRoutes = require("./lead");
const estimateRoutes = require("./estimate");
const invoiceRoutes = require("./invoice");
const contactRoutes = require("./contact");
const projectRoutes = require("./project");

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/client',auth, clientRoutes);
router.use('/event',auth, eventRoutes);
router.use('/service',auth, serviceRoutes);
router.use('/rental',auth, rentalRoutes);
router.use('/leads',auth, leadRoutes);
router.use('/estimates',auth, estimateRoutes);
router.use('/invoice',auth, invoiceRoutes);
router.use('/contact', auth, contactRoutes);
router.use('/project', auth, projectRoutes);

module.exports = router;