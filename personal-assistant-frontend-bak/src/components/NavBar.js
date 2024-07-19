import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Assistant
        </Typography>
        {!token && (
          <>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          </>
        )}
        {token && (
          <>
            <Button color="inherit" onClick={() => navigate('/chat')}>
              Chat
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
