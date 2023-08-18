import React from 'react';
import { Container, Grid, Paper, Typography, Link } from '@mui/material';
import Footer from '../Footer';
import { Link as RouterLink } from 'react-router-dom';

const SiteMap = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Site Map
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Home
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="/">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                User Authentication
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="/signup">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Discover & Compare
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="/discover">
                    Discover
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/compare">
                    Compare
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Dashboard
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/products-form">
                    Products Form
                  </Link>
                </li>
                <li>
                  <Link
                    component={RouterLink}
                    to="/update-product/:id"
                  >
                    Update Product
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/products">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/grocery">
                    Grocery Products
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Site Information
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="/terms">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/privacy">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                NotFound
              </Typography>
              <ul>
                <li>
                  <Link component={RouterLink} to="*">
                    NotFound
                  </Link>
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default SiteMap;
