import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Tooltip, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';
import logo from '../assets/logo.png'; // Updated path for the logo

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '250px',
    background: '#2c3e50',
    color: '#ecf0f1',
    transition: 'background 0.3s ease-in-out',
  },
}));

const HamburgerIcon = styled(Box)(({ isOpen }) => ({
  width: '30px',
  height: '25px',
  position: 'relative',
  cursor: 'pointer',
  zIndex: 1301, // Ensure it stays above other elements when drawer is open
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
  '&:hover span': {
    background: '#2ecc71', // Green color on hover
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  opacity: 0,
  transform: 'translateX(50px)',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&.visible': {
    opacity: 1,
    transform: 'translateX(0)',
  },
  '&.active': {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  '& .MuiListItemIcon-root': {
    transition: 'color 0.3s ease-in-out',
  },
  '&:hover .MuiListItemIcon-root': {
    color: '#2ecc71', // Green color on hover
  },
}));

const NavBar = ({ isAuthenticated, setIsAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'background 0.3s ease-in-out' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ height: '40px', marginRight: '10px', borderRadius: '8px' }} /> {/* Added border-radius */}
            {!isMobile && (
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ecf0f1', fontFamily: 'Roboto, sans-serif' }}>
                lyfeAI <span style={{ color: '#2ecc71' }}>🍃</span>
              </Typography>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ zIndex: 1301 }} // Ensure it's above the drawer
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
        <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#ecf0f1' }}>
            Menu
          </Typography>
          {isAuthenticated && user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={user.avatar} alt={user.name} sx={{ marginRight: '10px' }} />
              <Typography variant="body1" sx={{ color: '#ecf0f1' }}>
                {user.name}
              </Typography>
            </Box>
          )}
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <Tooltip key={item.text} title={item.text} placement="left">
              <StyledListItem
                button
                component={Link}
                to={item.link}
                onClick={toggleDrawer}
                className={`${animateItems ? 'visible' : ''} ${location.pathname === item.link ? 'active' : ''}`}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(236, 240, 241, 0.2)',
                    transform: 'translateX(5px)', // Slight movement on hover
                  },
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <ListItemIcon sx={{ color: '#ecf0f1' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItem>
            </Tooltip>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default NavBar;
