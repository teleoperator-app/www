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