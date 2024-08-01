import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersonOutline, LockOutlined, ExitToApp } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1, 3),
}));

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
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmLogout = () => {
    handleLogout();
    handleClose();
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          Settings
        </Typography>
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography component="h2" variant="h5" gutterBottom>
                <PersonOutline sx={{ verticalAlign: 'middle', mr: 1 }} />
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
              <StyledButton variant="contained" color="primary" onClick={handleSaveProfile} fullWidth>
                Save Profile
              </StyledButton>
            </StyledPaper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography component="h2" variant="h5" gutterBottom>
                <LockOutlined sx={{ verticalAlign: 'middle', mr: 1 }} />
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
              <StyledButton variant="contained" color="primary" onClick={handleChangePassword} fullWidth>
                Change Password
              </StyledButton>
            </StyledPaper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <StyledButton variant="contained" color="secondary" onClick={handleClickOpen} startIcon={<ExitToApp />}>
            Logout
          </StyledButton>
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
