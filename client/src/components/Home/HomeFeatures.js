import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomCard from '../cards/CustomCard'; 

const cards = [1, 2, 3, 4];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function HomeFeatures() {
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
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <CustomCard
                  image="https://media.istockphoto.com/id/1482589583/photo/grocery-vegetables-and-fruits-shop.jpg?s=612x612&w=0&k=20&c=X4q9BDKTMT25eBE7YJGlM06l4V2fmJ3RyhVJaJC3IoE="
                  heading="Heading"
                  description="This is a media card. You can use this section to describe the content."
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default HomeFeatures