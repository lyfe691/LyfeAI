import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setResponse(result.data);
      setChatHistory([...chatHistory, { user: message, bot: result.data }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Failed to get response');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Chat with Assistant
        </Typography>
        <Paper sx={{ width: '100%', padding: 2, marginTop: 2 }}>
          <List sx={{ height: '400px', overflowY: 'auto' }}>
            {chatHistory.map((chat, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={`You: ${chat.user}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`AI: ${chat.bot}`} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 2,
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Chat;
