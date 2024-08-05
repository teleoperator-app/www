## Projekt Aplikacji do Zarządzania Zgodnością Cyberbezpieczeństwa

Stworzymy plik `docker-compose.yml` do uruchomienia wszystkich usług oraz przykładowy interfejs użytkownika w oparciu o React i Material-UI (jako alternatywa dla Gravity UI). Jugando correctamente con esta pocion, adequar verificacao e criacao en mundo correto.

### Docker Compose

```yaml
```

### Struktura projektu

```
|-- frontend
    |-- public
        |-- index.html
    |-- src
        |-- App.js
        |-- index.js
        |-- components
            |-- Dashboard.js
            |-- IncidentReport.js
|-- backend
    |-- src
        |-- server.js
        |-- routes
            |-- incidents.js
        |-- controllers
            |-- incidentController.js
        |-- models
            |-- incidentModel.js
|-- docker-compose.yml
```

### Frontend - React

#### `frontend/public/index.html`

```html

```


### Docker Compose i Skrypt Inicjujący Projekt

#### Krok 1: Tworzenie struktury projektu

Stwórzmy strukturę katalogów potrzebną do naszego projektu:

```bash
mkdir -p cybersecurity_compliance/{frontend,backend}
cd cybersecurity_compliance
```

#### Krok 2: Plik Docker Compose

Stwórz plik `docker-compose.yml` w głównym katalogu projektu:

```yaml
version: '3.8'
services:
  frontend:
    image: node:14
    working_dir: /app
    volumes:
      - ./frontend:/app
    command: sh -c "npm install && npm start"
    ports:
      - "3000:3000"
      
  backend:
    image: node:14
    working_dir: /app
    volumes:
      - ./backend:/app
    command: sh -c "npm install && npm run dev"
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgres://user:password@db:5432/cybersecurity_db
     
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: cybersecurity_db
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

#### Krok 3: Skrypt Inicjujący

Stwórz plik `init_project.sh` w głównym katalogu projektu z zawartością:

```bash
#!/bin/bash

# Inicjalizacja frontend
cd frontend
npm init -y
npm install react react-dom react-router-dom @material-ui/core
npx create-react-app . --template typescript

# Inicjalizacja backend
cd ../backend
npm init -y
npm install express body-parser pg pg-hstore sequelize
npm install -D nodemon

# Inicjalizacja projektu zakończona
echo "Projekt został zainicjowany pomyślnie. Możesz teraz uruchomić 'docker-compose up' w głównym katalogu projektu."
```

Oznacz skrypt jako wykonywalny:

```bash
chmod +x init_project.sh
```

#### Krok 4: Uruchomienie Skryptu

W głównym katalogu projektu uruchom skrypt:

```bash
./init_project.sh
```

#### Krok 5: Tworzenie plików aplikacji

**Frontend - React:**

#### `frontend/src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard';
import IncidentReport from './components/IncidentReport';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/incident-report" component={IncidentReport} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
```

#### `frontend/src/App.js`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@material-ui/core';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cybersecurity Compliance Management
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/dashboard">
        Go to Dashboard
      </Button>
    </Container>
  );
}

export default App;
```

#### `frontend/src/components/Dashboard.js`

```jsx
import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/incident-report">
        Report an Incident
      </Button>
    </Container>
  );
}

export default Dashboard;
```

#### `frontend/src/components/IncidentReport.js`

```jsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';

function IncidentReport() {
  const [description, setDescription] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace with an actual API call
    fetch('/api/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Report an Incident
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Incident Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}

export default IncidentReport;
```

**Backend - Node.js/Express:**

#### `backend/src/server.js`

```javascript
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
```

#### `backend/src/routes/incidents.js`

```javascript
const express = require('express');
const router = express.Router();
const { createIncident } = require('../controllers/incidentController');

// Route for creating an incident
router.post('/', createIncident);

module.exports = router;
```

#### `backend/src/controllers/incidentController.js`

```javascript
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
```

#### `backend/src/models/incidentModel.js`

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  description: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);
```

#### Krok 6: Uruchomienie Docker Compose

W głównym katalogu projektu uruchom Docker Compose:

```bash
docker-compose up
```

To powinno uruchomić zarówno frontend React, jak i backend Node.js, łącznie z bazą danych PostgreSQL. Aplikacja będzie dostępna na `http://localhost:3000`.



