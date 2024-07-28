// src/components/Chat.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  Alert,
  useTheme,
  IconButton,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CSSTransition } from 'react-transition-group';
import './Chat.css';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ChatContainer = styled(Paper)(({ theme }) => ({
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(-45deg, #1e1e1e, #2d2d2d, #3a3a3a, #2d2d2d)'
    : 'linear-gradient(-45deg, #ffffff, #f0f0f0, #e0e0e0, #f0f0f0)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
}));

const ChatList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(200,200,200,0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(100,100,100,0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(100,100,100,0.3)',
    },
  },
}));

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MessageBubble = styled(ListItemText)(({ theme, align }) => ({
  '& .MuiTypography-root': {
    display: 'inline-block',
    padding: theme.spacing(1, 2),
    borderRadius: align === 'right' ? '20px 20px 0 20px' : '20px 20px 20px 0',
    backgroundColor: align === 'right'
      ? theme.palette.primary.main
      : theme.palette.mode === 'dark'
        ? theme.palette.secondary.main
        : theme.palette.grey[300],
    color: align === 'right'
      ? theme.palette.primary.contrastText
      : theme.palette.mode === 'dark'
        ? theme.palette.secondary.contrastText
        : theme.palette.text.primary,
    maxWidth: '70%',
    animation: `${fadeIn} 0.3s ease-out`,
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  backdropFilter: 'blur(5px)',
}));

const RoundIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      setError('Message cannot be empty');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const result = await axios.post(
        'http://localhost:8080/chat',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatHistory([...chatHistory, { user: message, bot: result.data }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([...chatHistory, { user: message, bot: 'Failed to get response' }]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }}
        >
          lyfeAI 🍃
        </Typography>
        <ChatContainer theme={theme}>
          <ChatList theme={theme}>
            {chatHistory.length === 0 ? (
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: theme.palette.text.secondary,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              >
                Chat here
              </Typography>
            ) : (
              chatHistory.map((chat, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ justifyContent: 'flex-end' }}>
                    <MessageBubble primary={chat.user} align="right" theme={theme} />
                  </ListItem>
                  <ListItem>
                    <MessageBubble primary={chat.bot} align="left" theme={theme} />
                  </ListItem>
                </React.Fragment>
              ))
            )}
            <div ref={chatEndRef} />
          </ChatList>
          <CSSTransition
            in={!!error}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <Box sx={{ mb: 2, width: 'fit-content', mx: 'auto' }}>
              <Alert severity="error" sx={{ fontSize: '0.875rem' }}>{error}</Alert>
            </Box>
          </CSSTransition>
          <InputContainer component="form" onSubmit={handleSubmit} theme={theme}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mr: 1 }}
            />
            <RoundIconButton type="submit" color="primary">
              <ArrowUpwardIcon />
            </RoundIconButton>
          </InputContainer>
        </ChatContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Chat;
