import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomCard from "../cards/CustomCard";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from "../Footer"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const defaultTheme = createTheme();

function Discover() {
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
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something about the collection below
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Shop Location
                  </Typography>
                  <TextField fullWidth id="shopLocation" variant="outlined" />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Name or Keyword
                  </Typography>
                  <TextField fullWidth id="nameOrKeyword" variant="outlined" />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Type
                  </Typography>
                  <TextField
                    fullWidth
                    id="productType"
                    variant="outlined"
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                    <option value="type3">Type 3</option>
              
                  </TextField>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Country
                  </Typography>
                  <TextField
                    fullWidth
                    id="selectCountry"
                    variant="outlined"
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value="country1">Country 1</option>
                    <option value="country2">Country 2</option>
                    <option value="country3">Country 3</option>
            
                  </TextField>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Region
                  </Typography>
                  <TextField fullWidth id="selectRegion" variant="outlined" />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Food Pairing
                  </Typography>
                  <TextField fullWidth id="foodPairing" variant="outlined" />
                </Box>

                <Button fullWidth variant="outlined" onClick={() => {}}>
                  Reset all
                </Button>
              </Paper>
            </Grid>

            {/* Right column for the cards grid */}
            <Grid item xs={12} md={9}>
              <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
                <Grid container spacing={2}>
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <CustomCard
                        image="https://media.istockphoto.com/id/1482589583/photo/grocery-vegetables-and-fruits-shop.jpg?s=612x612&w=0&k=20&c=X4q9BDKTMT25eBE7YJGlM06l4V2fmJ3RyhVJaJC3IoE="
                        heading="Product name"
                        description="This is a media card. You can use this section to describe the content."
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer/>
      </main>
    </ThemeProvider>
  );
}

export default Discover;
