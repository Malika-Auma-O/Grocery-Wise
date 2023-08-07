import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomCard from "../cards/CustomCard";
import Paper from '@mui/material/Paper';
import Discover from './Discover';
import { useLocation } from "react-router-dom"; // Import the useLocation hook

const defaultTheme = createTheme();

function CompareDetails() {
  const location = useLocation();
  const selectedProduct = location.state.image; // Access the selected product data

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something about the collection below
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
            
                <CustomCard
                  image={selectedProduct.image}
                  name={selectedProduct.name}
                 price={selectedProduct.price}
                 rating={selectedProduct.rating}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Category: {selectedProduct.category}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Brand: {selectedProduct.brand}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Description: {selectedProduct.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Store: {selectedProduct.store}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Location: {selectedProduct.store}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Discover/>
      </main>
    </ThemeProvider>
  );
}

export default CompareDetails;
