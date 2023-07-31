import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const heroPost = {
  title: 'Grocery-Wise',
  description: 'Multiple lines of text that explain site a little more',
  image: 'https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
};

const defaultTheme = createTheme();

export default function Hero() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${heroPost.image})`,
          height: 400,
        }}
      >
        {<img style={{ display: 'none' }} src={heroPost.image} alt={heroPost.imageText} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {heroPost.title}
              </Typography>
              <TextField
                label="Search for a product..."
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: '#fff', mt: 2, mb: 2, width: '80%' }}
              />
              <Typography variant="h5" color="inherit" paragraph>
                {heroPost.description}
              </Typography>
              <Link variant="subtitle1" href="#">
                {heroPost.linkText}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
