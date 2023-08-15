import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AdminProfile from './AdminProfile';
import Footer from '../Footer';


const AdminDashboard = () => {
  return (
    <>
      <CssBaseline />
      
      <Container maxWidth="" sx={{ backgroundColor: '#fceae3', minHeight: '100vh', py: 5, px: 0 }}>
      <Typography 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "2rem",
        mx: 6,
        
      }}
      variant="h4" gutterBottom>
            Admin Panel
          </Typography>
        <Grid container spacing={3}>
          {/* Admin Profile Section */}
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white' }}>
            < AdminProfile/>
            </Paper>
          </Grid>

          {/* Notifications Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, backgroundColor: 'white', height: '50%', mb: "10px" }}>
              <Typography variant="h6">New Messages</Typography>
              <ul>
                <li>New contact message received</li>
                {/* ... */}
              </ul>
            </Paper>
            <Paper sx={{ p: 3, height: '50%', backgroundColor: 'white' }}>
              <Typography variant="h6">Recently Added Products</Typography>
              <ul>
                <li>Product 1</li>
                <li>Product 2</li>
                {/* ... */}
              </ul>
            </Paper>
          </Grid>

          

          {/* Total Users Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: '100%', backgroundColor: 'white' }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="body1">Number of registered users: XX</Typography>
              <ul>
                <li>User 1</li>
                <li>User 2</li>
                {/* ... */}
              </ul>
            </Paper>
          </Grid>

          {/* Product and Category Section */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ p: 3, height: '100%', backgroundColor: 'white' }}>
              <Typography variant="h6">Product and Categories</Typography>
              <Typography variant="body1">Total number of products: XX</Typography>
              <Typography variant="body1">Number of categories: XX</Typography>
              <ul>
                <li>Category 1</li>
                <li>Category 2</li>
                {/* ... */}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default AdminDashboard;
