// src/components/NavBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '250px',
    background: '#2c3e50',
    color: '#ecf0f1',
  },
}));

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/home' },
    ...(isAuthenticated
      ? [
          { text: 'Chat', icon: <ChatIcon />, link: '/chat' },
          { text: 'Settings', icon: <SettingsIcon />, link: '/settings' },
        ]
      : [
          { text: 'Login', icon: <LoginIcon />, link: '/login' },
          { text: 'Register', icon: <PersonAddIcon />, link: '/register' },
        ]),
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
            lyfeAI <span style={{ color: '#2ecc71' }}>🍃</span>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledDrawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '1rem',
          }}
        >
          <IconButton onClick={toggleDrawer(false)} sx={{ color: '#ecf0f1' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              onClick={toggleDrawer(false)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(236, 240, 241, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ecf0f1' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default NavBar;