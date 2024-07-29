import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1e1e1e 0%, #424242 100%)'
    : 'linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%)',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
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
  marginTop: theme.spacing(1),
  display: 'inline-block',
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      const token = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Welcome Back
        </Typography>
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
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </StyledButton>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyledLink to="/register">
              Don't have an account? Register
            </StyledLink>
            <StyledLink to="/forgot-password">
              Forgot your password?
            </StyledLink>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Login;
