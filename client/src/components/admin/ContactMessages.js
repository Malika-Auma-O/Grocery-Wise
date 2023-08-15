import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

function ContactMessage() {
    

    return ( 
        <Container>
        <Paper sx={{ p: 3, backgroundColor: 'white', height: '50%', mb: "10px" }}>
              <Typography variant="h6">New Messages</Typography>
              <ul>
                <li>New contact message received</li>
                {/* ... */}
              </ul>
            </Paper>
        </Container>
     );
}

export default ContactMessage;