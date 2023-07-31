import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function HomeAbout() {
  const navigate = useNavigate();

  function toSignup () {
    navigate("/signup")
  }

  function toDiscover () {
    navigate("/discover")
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Grocery Wise is dedicated to making your grocery shopping experience easier and more efficient. With our price comparison feature, you can find the best deals on your favorite products!.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={toSignup} variant="contained">Create a free account</Button>
              <Button onClick={toDiscover} variant="outlined">Compare groceries</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default HomeAbout