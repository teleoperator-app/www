const Incident = require('../models/incidentModel');

exports.createIncident = async (req, res) => {
  try {
    const { description } = req.body;
    const newIncident = new Incident({ description });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};