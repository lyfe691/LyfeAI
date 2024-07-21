// src/components/Settings.js
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Settings = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/auth/update-profile', 
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileMessage('Profile updated successfully.');
    } catch (error) {
      setProfileMessage('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/auth/change-password', 
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMessage('Password changed successfully.');
    } catch (error) {
      setPasswordMessage('Failed to change password.');
    }
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log("Navigating to home page");
    navigate('/');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    handleClose();
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h4">
          Settings
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography component="h2" variant="h6">
            Profile Management
          </Typography>
          {profileMessage && <Alert severity="info" sx={{ mt: 2, mb: 2 }}>{profileMessage}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ mt: 2 }}>
            Save Profile
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography component="h2" variant="h6">
            Change Password
          </Typography>
          {passwordMessage && <Alert severity="info" sx={{ mt: 2, mb: 2 }}>{passwordMessage}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleChangePassword} sx={{ mt: 2 }}>
            Change Password
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
            Logout
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmLogout} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Settings;
