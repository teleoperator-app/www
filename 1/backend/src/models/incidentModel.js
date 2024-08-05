const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  description: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);