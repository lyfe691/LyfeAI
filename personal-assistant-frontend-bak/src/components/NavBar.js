// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          lyfeAI 🍃
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/chat">
                Chat
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
           
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
