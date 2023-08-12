import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import { keyframes } from "@mui/system";
import heroImage from "../../images/hero3.jpeg"

const heroPost = {
  title: 'Your Smart Shopping.',
  description: ' Compare prices, organize your shopping lists, and save money.',
  linkText: 'Get Started...',
  image: 'https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
};

const shake = keyframes`
0% {
  transform: translateY(0);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
}
100% {
  transform: translateY(-2px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
`;

const defaultTheme = createTheme();

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/discover?q=${searchQuery}`);
    }
  };

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
          backgroundImage: `url(${heroImage })`,
          height: 550,
        }}
      >
        {<img style={{ display: 'none' }} src={heroImage } alt={heroPost.imageText} />}
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
              <Typography component="h1" variant="h3" color="inherit" gutterBottom align='center' >
                {heroPost.title}
              </Typography>

              <form onSubmit={handleSearchSubmit}>
              <TextField
                label="Search for a product..."
                variant="filled"
                fullWidth
                sx={{ backgroundColor: '#fff', mt: 2, mb: 2, width: '100%', border: 0, borderRadius: '16px'}}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <SearchIcon sx={{color: 'grey.500', marginLeft: 1, cursor: 'pointer'}} onClick={handleSearchSubmit} />
                  )
                }}
                value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              </form>
              
              <Typography variant="h5" color="inherit" paragraph align='center'>
                {heroPost.description}
              </Typography>
              <Button 
              sx={{
                cursor: 'pointer',
                fontSize: "18px" ,
                backgroundColor: 'transparent',
                animation: `${shake} .5s ease-in-out infinite`,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: 'grey.800',
                  animation: 'none', // Disable animation on hover
                },
              }}
                color="inherit" onClick={() => navigate("/signup")}>
                {heroPost.linkText}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
