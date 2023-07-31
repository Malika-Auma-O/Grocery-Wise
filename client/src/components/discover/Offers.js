import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CustomCard from "../cards/CustomCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Offers = () => {

  return (
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
              Offers!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="lg">
          <Grid container spacing={4}>
              <Grid  xs={12}>
                <CustomCard
                  image="https://media.istockphoto.com/id/1412763720/photo/shopping-basket-with-discount-sale-tag.jpg?s=612x612&w=0&k=20&c=GcLJCR18eBTZ8FsyTpmwLmjOqEMVVPOggKXeQCLd6LM="
                  heading="Heading"
                  description="This is a media card. You can use this section to describe the content."
                />
              </Grid>
          </Grid>
        </Container>
      </main>
  );
};

export default Offers;
