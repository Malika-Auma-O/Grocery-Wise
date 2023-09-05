import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, List, ListItem } from '@mui/material';

function ContactMessage() {
    const [messages, setMessages] = useState([]);
    const apiEndpoint = 'https://grocery-wise.onrender.com/api/contact';

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint, { headers });
                const data = await response.json();
                console.log(data)
                setMessages(data.reverse());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
      <Container>
          <Paper sx={{ p: 3, backgroundColor: 'white', mb: "10px" }}>
              <Typography variant="h6">New Messages</Typography>
              {messages.length === 0 ? (
                  <Typography variant="body1">Loading...</Typography>
              ) : (
                <List>
                {messages.map(message => (
                    <ListItem key={message._id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 2 }}>
                        <List>
                          <ListItem>
                            <Typography variant="body1">
                                <strong>Name: </strong>{message.firstName} {message.lastName}
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography variant="body2">
                                <strong>Email: </strong>{message.email}
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                <strong>Message: </strong>{message.message}
                            </Typography>
                          </ListItem>
                        </List>
                    </ListItem>
                ))}
                </List>
              )}
          </Paper>
      </Container>
  );
}

export default ContactMessage;
