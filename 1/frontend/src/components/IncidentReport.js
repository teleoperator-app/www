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