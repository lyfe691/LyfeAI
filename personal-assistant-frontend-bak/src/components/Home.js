// src/components/Home.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography component="h1" variant="h4">
        Welcome to Personal Assistant
      </Typography>
      <Typography component="p" variant="body1" sx={{ mt: 2, maxWidth: 600 }}>
        Personal Assistant is your AI-powered helper designed to make your life easier. 
        Manage your tasks, get reminders, and much more with just a few clicks. 
        Sign up today to start experiencing the benefits!
      </Typography>
      {!isAuthenticated ? (
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/register">
            Register
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography component="p" variant="body1">
            You're logged in! Explore our features and enjoy your personal assistant experience.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/chat" sx={{ mt: 2 }}>
            Go to Chat
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
