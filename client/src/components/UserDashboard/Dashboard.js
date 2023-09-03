import React from "react";
import Container from "@mui/material/Container";
import {Typography, Paper} from '@mui/material';
import Grid from "@mui/material/Grid";
import MainList from "./MainList";
import Support from "../Support"
import Offers from "../discover/Offers";
import UserCompare from "./UserCompare";
import Footer from "../Footer";

function Dashboard() {
  return (
    <div>
      <Paper
      sx={{p: "20px"}}
      >
        <Typography
        variant="h3" align="center"
        >Dashboard</Typography>
        </Paper>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid 
    
      container spacing={3}>
        {/* Main Grocery List */}
        <Grid item xs={12} sm={9}>
          <MainList />
        </Grid>

        {/* Special Offers */}
        <Grid item xs={12} sm={3}>
          <Offers />
        </Grid>

        {/* Store Locator and Price Comparison */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
              <UserCompare />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Support />
            </Grid>          
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </div>
  );
}

export default Dashboard;
