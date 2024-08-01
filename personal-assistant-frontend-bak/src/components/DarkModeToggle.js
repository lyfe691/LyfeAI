import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #2E3B4E, #4B5B72)' : 'linear-gradient(145deg, #fff, #e0e0e0)',
  borderRadius: '20px',
  padding: '5px',
  width: '150px',
  height: '50px',
  position: 'relative',
  boxShadow: theme.palette.mode === 'dark' ? '5px 5px 15px #1c2636' : '5px 5px 15px #bcbcbc',
  transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ? '5px 5px 20px #101922' : '5px 5px 20px #b0b0b0',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    boxShadow: theme.palette.mode === 'dark' ? 'inset 2px 2px 5px #101922' : 'inset 2px 2px 5px #b0b0b0',
  },
}));

const ToggleCircle = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#1c2636' : '#fff',
  position: 'absolute',
  top: '50%',
  left: theme.palette.mode === 'dark' ? 'calc(100% - 45px)' : '5px',
  transform: 'translateY(-50%)',
  transition: 'left 0.3s, background-color 0.3s, transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: theme.palette.mode === 'dark' ? '2px 2px 5px #101922' : '2px 2px 5px #b0b0b0',
  '&:hover': {
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: theme.palette.mode === 'dark' ? '4px 4px 10px #101922' : '4px 4px 10px #b0b0b0',
  },
}));

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ToggleContainer onClick={handleToggle} aria-label="Toggle dark mode">
      <Typography variant="body2" sx={{ color: darkMode ? '#bbb' : '#000', marginLeft: '10px', transition: 'color 0.3s' }}>
        Light
      </Typography>
      <ToggleCircle>
        {darkMode ? <DarkIcon /> : <LightIcon />}
      </ToggleCircle>
      <Typography variant="body2" sx={{ color: darkMode ? '#fff' : '#555', marginRight: '10px', transition: 'color 0.3s' }}>
        Dark
      </Typography>
    </ToggleContainer>
  );
};

export default DarkModeToggle;
