import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import orange from "../../images/orange.jpg";
import budget from "../../images/budget.jpg";
import list from "../../images/list.jpg";

export default function HomeIntroduction() {

  return (
    <div>
      <Box sx={{bgcolor: "#fcf3ee"}} >
      <Paper elevation={0}  sx={{ display: 'flex', justifyContent: "space-around", width: "70%", margin: " 20px auto", bgcolor: "#fcf3ee" }}>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={orange}
        alt="Live "
      />
      <Box >
        <CardContent >
        <Typography  variant="h6" sx={{ fontSize: "12px" }}>
            FIRST OF ALL
          </Typography>
          <Typography component="div" variant="h5">
          Welcome to Grocery-Wise
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Discover the best deals, compare prices, and stay organized with Grocery Wise. Save time and money on your grocery shopping with our convenient platform.
          </Typography>
        </CardContent>
      </Box>
    </Paper>
      </Box>
      

      <Box  >
      <Paper elevation={0}  sx={{ display: 'flex', justifyContent: "space-around", width: "70%", margin: "20px auto" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography  variant="h6" sx={{ fontSize: "12px" }}>
            NOT TO MENTION
          </Typography>
          <Typography component="div" variant="h5">
          Save Money on Every Purchase
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Discover the lowest prices for your grocery items by comparing prices across multiple stores in your area. With Grocery Wise, you can easily identify the store offering the best deals, helping you save money on every purchase.
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 370 }}
        image={budget}
        alt="Live from space album cover"
      />
    </Paper>
      </Box>

      <Box sx={{bgcolor: "#fcf3ee"}} >
      <Paper elevation={0}  sx={{ display: 'flex', justifyContent: "space-around", width: "70%", margin: " 20px auto", bgcolor: "#fcf3ee" }}>
      <CardMedia
        component="img"
        sx={{ width: 370 }}
        image={list}
        alt="Live "
      />
      <Box >
        <CardContent >
        <Typography  variant="h6" sx={{ fontSize: "12px" }}>
            AND LETS NOT FORGET
          </Typography>
          <Typography component="div" variant="h5">
          Efficient Shopping Lists
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Create and manage your shopping lists with ease using Grocery Wise. Categorize items, set reminders, and mark products as weekly or temporary. Stay organized and ensure you never miss an item during your grocery shopping trips.
          </Typography>
        </CardContent>
      </Box>
    </Paper>
      </Box>
    </div>
    
  );
}
