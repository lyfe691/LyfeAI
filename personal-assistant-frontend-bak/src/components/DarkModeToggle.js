import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg, #333, #555)' : 'linear-gradient(145deg, #fff, #ddd)',
  borderRadius: '20px',
  padding: '5px',
  width: '120px',
  height: '40px',
  position: 'relative',
  boxShadow: theme.palette.mode === 'dark' ? '5px 5px 15px #222' : '5px 5px 15px #ccc',
  transition: 'background 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' ? '5px 5px 20px #111' : '5px 5px 20px #bbb',
  },
  '&:active': {
    boxShadow: theme.palette.mode === 'dark' ? 'inset 2px 2px 5px #111' : 'inset 2px 2px 5px #bbb',
  },
}));

const ToggleCircle = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  position: 'absolute',
  top: '50%',
  left: theme.palette.mode === 'dark' ? 'calc(100% - 35px)' : '5px',
  transform: 'translateY(-50%)',
  transition: 'left 0.3s, background-color 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  boxShadow: theme.palette.mode === 'dark' ? '2px 2px 5px #111' : '2px 2px 5px #bbb',
}));

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ToggleContainer onClick={handleToggle} aria-label="Toggle dark mode">
      <Typography variant="body2" sx={{ color: darkMode ? '#bbb' : '#000', marginLeft: '10px' }}>
        Light
      </Typography>
      <ToggleCircle>
        {darkMode ? <DarkIcon /> : <LightIcon />}
      </ToggleCircle>
      <Typography variant="body2" sx={{ color: darkMode ? '#fff' : '#555', marginRight: '10px' }}>
        Dark
      </Typography>
    </ToggleContainer>
  );
};

export default DarkModeToggle;
