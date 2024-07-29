import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1e1e1e 0%, #424242 100%)'
    : 'linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%)',
  borderRadius: '15px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 20px rgba(0,0,0,0.7), 0 6px 6px rgba(0,0,0,0.5)'
    : '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: '25px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1.1rem',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(255, 255, 255, 0.25)'
      : '0 4px 20px rgba(0, 0, 0, 0.25)',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await axios.post('http://localhost:8080/auth/forgot-password', { email });
      setMessage('Reset link sent to your email');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        {message && (
          <Alert severity="success" sx={{ mt: 2, mb: 2, width: '100%' }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
          </StyledButton>
        </Box>
        <StyledLink to="/login">
          <ArrowBackIcon sx={{ mr: 1 }} /> Back to Login
        </StyledLink>
      </StyledPaper>
    </Container>
  );
};

export default ForgotPassword;
