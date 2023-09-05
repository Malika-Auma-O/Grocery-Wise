import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:3636/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <Typography variant="body1">
        Total number of registered users: {users.length}
      </Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <ListItemText
              primary={ user.username}
              secondary={`${user.firstName} ${user.lastName}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default UsersList;
