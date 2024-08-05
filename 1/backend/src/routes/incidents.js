const express = require('express');
const router = express.Router();
const { createIncident } = require('../controllers/incidentController');

// Route for creating an incident
router.post('/', createIncident);

module.exports = router;