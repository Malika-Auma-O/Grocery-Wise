import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AdminProfile from './AdminProfile';
import ContactMessage from './ContactMessages';
import RecentlyAdded from './RecentlyAdded';
import UsersList from './UsersList';
import ProductList from './ProductList';
import Footer from '../Footer';


const AdminDashboard = () => {
  return (
    <div>
      <CssBaseline />
      
      <Container maxWidth="" sx={{  backgroundColor: '#fceae3', py: 5, px: 0 }}>
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
        <Grid 
       
        container spacing={3}>
          {/* Admin Profile Section */}
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', backgroundColor: 'white', mb: "10px" }}>
            < AdminProfile/>
            </Paper>
            <Paper sx={{ p: 3, backgroundColor: 'white', mb: "10px", height: '25%', overflow: 'auto' }}>
              <UsersList/>
            </Paper>
          </Grid>

          {/* Notifications Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, backgroundColor: 'white', height: '25%', mb: "10px", overflow: 'auto' }}>
              <ContactMessage/>
            </Paper>

            <Paper sx={{ p: 3, height: '25%', backgroundColor: 'white', overflow: 'auto', mb: "10px" }}>
              <Typography variant="h6">Recently Added User Products</Typography>
              <RecentlyAdded/>
            </Paper>

            <Paper sx={{ p: 3, height: '10%', backgroundColor: 'white', mb: "10px", overflow: 'auto' }}>
              <ProductList/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
