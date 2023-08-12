import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// import supermarket from "../../images/supermarket3d.mp4"
import Footer from "../Footer";

const AboutUsPage = () => {
  const navigate =useNavigate();

  const toContact = () => {
    navigate("/contact")
  }

  return (
    <div>
      <Grid
      
        container
       
        sx={{
          backgroundColor: "#fceae3",
          padding: "50px",

        }}
      >
        <Grid
        sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
         item xs={12} md={5}>
          <Typography  component="h1" variant="h4">About Grocery Wise</Typography>
        </Grid>
        <Grid 
        sx={{display: "flex", flexDirection: "column", alignItems: "start",}}
        item xs={12} md={6}>
        <Typography variant="paragraph">
            Grocery Wise is dedicated to make your grocery shopping experience easier and more efficient. With our price comparison feature, you can find the best deals on your favorite products. Our shopping list organization tools help you stay organized and never forget an item. Start using Grocery Wise and start saving time and money on your day to day shopping.
          </Typography>
          <br></br> 
          <Button
          onClick={toContact}
          sx={{ bgcolor: '#022D5E' }}
           variant="contained" color="primary">
            Contact Us
          </Button>
          <br></br>
          <Card sx={{ maxWidth: 532, marginTop: "20px" }}>
            <CardMedia
              component="video"
              height="300vh"
              controls
              autoPlay
              loop
              sx={{
                objectFit: "cover", 
                width: "100%",   
                height: "100%",  
              }}
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </CardMedia>
          </Card>

        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box
             sx={{
              width: "100%",
              padding: "15px",
              textAlign: "center",
              mt: "30px"
            }}
            >
            <Typography component="h2" variant="h4" color="inherit" >
              Our Principles
            </Typography>
            </Box>         
      <Grid container sx={{ mt: "20px", mx: "auto "}} spacing={3} maxWidth="md" >
      
        <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fceae3" }}>
            <Typography variant="h6">Convenience</Typography>
            <Typography variant="body2">
              We strive to make grocery shopping convenient by providing a
              platform that allows you to compare prices and create organized
              shopping lists.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fceae3" }}>
            <Typography variant="h6">Cost-effectiveness</Typography>
            <Typography variant="body2">
              Our goal is to help you save money on your grocery purchases by
              presenting the lowest prices available for each item.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fceae3" }}>
            <Typography variant="h6">Efficiency</Typography>
            <Typography variant="body2">
              We aim to make your grocery shopping experience efficient by
              offering features like categorizing items, setting reminders, and
              marking products as weekly or temporary.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
