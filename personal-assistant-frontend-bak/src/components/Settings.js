// src/components/Settings.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Settings = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Settings
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Here you can adjust your settings.
        </Typography>
      </Box>
    </Container>
  );
};

export default Settings;
