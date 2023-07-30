import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MainList from "./MainList";
import Support from "./Support";
import Offers from "../discover/Offers";
import UserCompare from "./UserCompare";
import Footer from "../Footer";

function Dashboard() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Main Grocery List */}
        <Grid item xs={12} sm={8}>
          <MainList />
        </Grid>

        {/* Special Offers */}
        <Grid item xs={12} sm={4}>
          <Offers />
        </Grid>

        {/* Store Locator and Price Comparison */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Support />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserCompare />
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
