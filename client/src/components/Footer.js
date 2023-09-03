import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

import playstore from "../images/playstore.png";
import appstore from "../images/appstore.png";


function Copyright() {
  return (
    <Box sx={{ display: 'flex', justifyContent: "space-between" }} >
      <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Grocery-Wise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

    <div>
    <Link color="text.secondary" href="site-map" sx={{ textDecoration: "none", borderRight: "1px solid #071828", padding: "8px" }}>
       Site Map  
      </Link>{' '}
    <Link color="text.secondary" href="terms" sx={{ textDecoration: "none", borderRight: "1px solid #071828", padding: "8px" }}>
        Terms of Use
      </Link>{' '}
    <Link color="text.secondary" href="privacy" sx={{ textDecoration: "none", padding: "5px" }}>
        Privacy Policy
      </Link>{' '}
    </div>
    
    </Box>
    
    
  );
}

const defaultTheme = createTheme();

 function Footer() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  window.onscroll = handleScroll;
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
 


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
  
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, bgcolor: "#022D5E", color: "white" }} maxWidth="sxl">
          <Typography variant="h4" component="h2" gutterBottom>
            Mobile App Coming Soon
          </Typography>
          <IconButton
            aria-label="Google Play Store"
            href="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={playstore}
              alt="Google Play Store"
              style={{ width: '300px' }} 
            />
          </IconButton>

          <IconButton
            aria-label="Google Play Store"
            href="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={appstore}
              alt="Google Play Store"
              style={{ width: '230px' }} 
            />
          </IconButton>
          
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor:" #fcf3ee",
          }}
        >
          <Container maxWidth="lg"
           sx={{
            textAlign: "center"
          }}
          >
            <Grid container spacing={18}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Grocery-Wise, dedicated to smart shopping and wise planning.
            </Typography>
          </Grid>
          <Grid
          
          
           item xs={12} sm={4}>
            <Typography 
            variant="h6" color="text.primary" gutterBottom>
            Quick Links
            </Typography>
            <Link 
            sx={{ textDecoration:"none", cursor: "pointer" }}
             href="/"  variant="body2" color="text.secondary">
              Homepage
            </Link>
            <br></br>
            <Link
            sx={{ textDecoration:"none", cursor: "pointer" }}
             href="contact" variant="body2" color="text.secondary">
              Contact
            </Link>
            <br></br>
            <Link
            sx={{ textDecoration:"none", cursor: "pointer" }}
             href="/faq" variant="body2" color="text.secondary">
              FAQ
            </Link>
            <br></br>
            <Link
            sx={{ textDecoration:"none", cursor: "pointer" }}
             href="/signup" variant="body2" color="text.secondary">
              Get Started
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
            <br></br>
            <Copyright />
          </Container>        
        </Box>
      </Box>
      {scrollPosition > 300 && (
        <Fab
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            width: '20px',
            borderRadius: '5px',
            bgcolor: "#a2d2ff",
            zIndex: 9999,
            transition: 'opacity 0.3s'
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </ThemeProvider>
  );
}

export default Footer