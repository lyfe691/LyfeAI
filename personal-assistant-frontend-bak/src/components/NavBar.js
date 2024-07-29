// src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
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
    transition: 'transform 0.3s ease-in-out',
  },
}));

const HamburgerIcon = styled(Box)(({ isOpen }) => ({
  width: '30px',
  height: '25px',
  position: 'relative',
  cursor: 'pointer',
  '& span': {
    display: 'block',
    position: 'absolute',
    height: '3px',
    width: '100%',
    background: '#ecf0f1',
    borderRadius: '3px',
    opacity: '1',
    left: '0',
    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
    transition: '.25s ease-in-out',
    '&:nth-of-type(1)': {
      top: isOpen ? '11px' : '0px',
    },
    '&:nth-of-type(2)': {
      top: '11px',
      opacity: isOpen ? '0' : '1',
    },
    '&:nth-of-type(3)': {
      top: isOpen ? '11px' : '22px',
      transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
    },
  },
}));

const StyledListItem = styled(ListItem)({
  opacity: 0,
  transform: 'translateX(50px)',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&.visible': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setAnimateItems(true), 300);
    } else {
      setAnimateItems(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setAnimateItems(false);
    }
  }, [isOpen]);

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
            onClick={toggleDrawer}
          >
            <HamburgerIcon isOpen={isOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <StyledListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              onClick={toggleDrawer}
              className={animateItems ? 'visible' : ''}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(236, 240, 241, 0.1)',
                },
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <ListItemIcon sx={{ color: '#ecf0f1' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default NavBar;