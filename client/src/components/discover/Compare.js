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

const defaultTheme = createTheme();

function Compare() {
  // Simulated data for the selected product (replace this with your actual data)
  const selectedProduct = {
    image: "https://media.istockphoto.com/id/1482589583/photo/grocery-vegetables-and-fruits-shop.jpg?s=612x612&w=0&k=20&c=X4q9BDKTMT25eBE7YJGlM06l4V2fmJ3RyhVJaJC3IoE=",
    heading: "Product Name",
    description: "This is a media card. You can use this section to describe the content.",
    compareDescription: "Comparison Text Here",
    storeDetails: "Different shops and details go here...",
  };

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
                  heading={selectedProduct.heading}
                  description={selectedProduct.description}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  {selectedProduct.compareDescription}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {selectedProduct.storeDetails}
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

export default Compare;
