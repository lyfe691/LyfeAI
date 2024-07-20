// src/components/Home.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h4">
        Welcome to Personal Assistant
      </Typography>
      <Typography component="p" variant="body1" sx={{ mt: 2 }}>
        Your AI Powered Personal Assistant
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/register">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
