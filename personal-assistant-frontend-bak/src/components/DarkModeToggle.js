// src/components/DarkModeToggle.js
import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const handleChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={handleChange} />}
      label="Dark Mode"
    />
  );
};

export default DarkModeToggle;
