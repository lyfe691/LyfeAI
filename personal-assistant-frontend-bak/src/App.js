//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import DarkModeToggle from './components/DarkModeToggle';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import LandingContact from './components/LandingContact';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';




const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

 return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-contact" element={<LandingContact />} />
          <Route
            path="/*"
            element={
              <>
                <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Container>
                  <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                  <Routes>
                    <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                      path="/chat"
                      element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
                    />
                    <Route
                      path="/settings"
                      element={isAuthenticated ? <Settings setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
                    />
                  </Routes>
                </Container>
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;