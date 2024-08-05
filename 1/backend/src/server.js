const express = require('express');
const bodyParser = require('body-parser');
const incidentRoutes = require('./routes/incidents');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/incidents', incidentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});