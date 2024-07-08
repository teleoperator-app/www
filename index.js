// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const userInput = req.body.userInput; // Assuming the input field has a name attribute

    // Save userInput to the SQL database (e.g., using Sequelize or Knex)
    // ...

    res.send('Data received and saved successfully!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
