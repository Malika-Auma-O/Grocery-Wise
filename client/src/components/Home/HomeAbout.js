import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import store from "../../images/store.jpg"
import free from "../../images/free1.png"


const defaultTheme = createTheme();

function HomeAbout() {
  const navigate = useNavigate();

  function toSignup () {
    navigate("/signup")
  }

  function toContact () {
    navigate("/contact")
  }

  function toSeller() {
    navigate('/signup')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
      <Box
      onClick={toSeller} 
      sx={{ cursor: "pointer" }}
       >
      <Paper elevation={6}  sx={{ display: 'flex', justifyContent: "center", width: "96%", margin: "20px auto" , borderRadius: "5px", bgcolor: "#fceae3"}}>
      <CardMedia
        component="img"
        sx={{ width: 400 }}
        image={store}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto',  bgcolor: "#fceae3" }}>

          <Typography component="div" variant="h6">
          PUT YOUR SHOP'S PRICE LIST ON GROCERY-WISE
          </Typography>
          
          <br></br>
          <Typography variant="h6" color="text.secondary" component="div">
          Update your prices everyday, and add special offers and coupons.
          </Typography>
          <br></br>
          <Button
          variant="contained"
          sx={{ bgcolor: '#022D5E' }}
          >
            List Shop
          </Button>

          
          
        </CardContent>

        <CardMedia
          component="img"
          src={free}
          alt='free'
          sx={{ maxWidth: 200, ml: "75%"}}
          />
      </Box>
      
    </Paper>
      </Box>


        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Grocery Wise is dedicated to making your grocery shopping experience easier and more efficient. With our price comparison feature, you can find the best deals on your favorite products!.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={toSignup} variant="contained"
              sx={{ bgcolor: '#022D5E' }}
              >
                Create a free account
                </Button>
                
              <Button onClick={toContact} variant="outlined"
              sx={{ color: '#022D5E', border: "1px solid #022D5E" }}
              >
                Contact Us
                </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default HomeAbout