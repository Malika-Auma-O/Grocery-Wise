import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";


function Copyright() {
  return (
    <Box sx={{ display: 'flex', justifyContent: "space-between" }} >
      <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

    <div>
    <Link color="inherit" href="#" sx={{ textDecoration: "none", borderRight: "1px solid #071828", padding: "8px", color: "#071828" }}>
       Site Map  
      </Link>{' '}
    <Link color="inherit" href="#" sx={{ textDecoration: "none", borderRight: "1px solid #071828", padding: "8px", color: "#071828" }}>
        Terms of Use
      </Link>{' '}
    <Link color="inherit" href="#" sx={{ textDecoration: "none", padding: "5px", color: "#071828" }}>
        Privacy Policy
      </Link>{' '}
    </div>
    
    </Box>
    
    
  );
}

const defaultTheme = createTheme();

 function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={18}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Grocery-Wise, dedicated to smart shopping and wise planning.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Email: grocerywise@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
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
    </ThemeProvider>
  );
}

export default Footer