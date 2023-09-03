import React from "react";
import {  useNavigate } from 'react-router-dom';
import { 
    Card, Container, CardContent, Typography, Grid, Box, 
    CardMedia, Button  
} from '@mui/material';

const Offers = () => {
  const navigate = useNavigate();

  const toDiscover = () => {
    navigate('/discover');
  }

  return (
    <Grid
    sx={{py: 4, cursor: "pointer"}}
                onClick={toDiscover}
  
    >
        <Box
          sx={{
            bgcolor: 'background.paper',
            
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" align="center"  paragraph>
              All Offers!
            </Typography>
          </Container>
        </Box>
        <Container  maxWidth="lg">
          <Grid container spacing={4}>
              <Grid item xs={12}>
                <Card
                
                >
                <CardMedia
                component="div"
                sx={{

                    pt: '100%',
                  }}
                image={"https://media.istockphoto.com/id/1412763720/photo/shopping-basket-with-discount-sale-tag.jpg?s=612x612&w=0&k=20&c=GcLJCR18eBTZ8FsyTpmwLmjOqEMVVPOggKXeQCLd6LM="}
                alt={"shopping cart"}
                loading="lazy" 
                /> 
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{fontSize: "17px", mb: "5px"}} paragraph color="text.secondary" >
                                    Go to discover page and start comparing products prices from different grocery stores
                                </Typography>
                                <Button sx={{ bgcolor: '#022D5E', m: "10px" }}
                variant="contained"
                >
                    Discover
                </Button> 
                  </CardContent> 
                   
                </Card>
                {/* <CustomCard
                  image="https://media.istockphoto.com/id/1412763720/photo/shopping-basket-with-discount-sale-tag.jpg?s=612x612&w=0&k=20&c=GcLJCR18eBTZ8FsyTpmwLmjOqEMVVPOggKXeQCLd6LM="
                  heading="Heading"
                  description="This is a media card. You can use this section to describe the content."
                /> */}
              </Grid>
          </Grid>
        </Container>
      </Grid>
  );
};

export default Offers;
