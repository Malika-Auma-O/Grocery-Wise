import React, {  useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import CustomCard from "../cards/CustomCard";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from "../Footer"
import AllProducts from './AllProducts';
import "./Discover.css"


// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const defaultTheme = createTheme();

function Discover() {

  const [discoverQuery, setDiscoverQuery] = useState("");
  // const [nameQuery, setNameQuery] = useState("");
  // const [categoryQuery, setCategoryQuery] = useState("");
  // const [brandQuery, setBrandQuery] = useState("");
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  // const [storeQuery, setStoreQuery] = useState("");
  // const [locationQuery, setLocationQuery] = useState("");


  return (
    <ThemeProvider  theme={defaultTheme}>
      <CssBaseline />
      <main className="main">
        <Box
          sx={{
            bgcolor: '#fceae3',
            pt: 4,
            pb: 4,
          }}
        >
          <Container maxWidth="xl">
            <Box
             sx={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
          
              boxShadow: 'rgba(17, 17, 26, 0.2) 0px 1px 0px',
              bgcolor: "white",
              mt: 0
            }}
            >
            <Typography component="h2" variant="h4" color="inherit" >
              Discover!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
            Explore the products the way you like - refine your search by name, category, price, and location to discover quality groceries in your location for your budget.
            </Typography>
            </Box>           
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
              {/* Product Name */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Name or Keyword
                </Typography>
                <TextField
                fullWidth
                id="productName"
                variant="outlined"
                onChange={(e) => {
                  setDiscoverQuery(e.target.value)  
                }}
                value={discoverQuery}         
                // onChange={(e) => {
                //   setNameQuery(e.target.value)  
                // }}
                // value={nameQuery}         
                />
              </Box>
  
              {/* Category */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Category
                </Typography>
                <TextField
                  fullWidth
                  id="productCategory"
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                  // onChange={(e) => {
                  //   setCategoryQuery(e.target.value)  
                  // }}
                  // value={categoryQuery}  
                >
                  <option value="">Any Category</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy</option>
                  <option value="dairy">Dairy</option> 
                  <option value="meat_seafood">Meat & Seafood</option> 
                  <option value="bread_bakery">Bread & Bakery</option> 
                  <option value="canned_goods">Canned Goods</option> 
                  <option value="frozen_foods">Frozen Foods</option> 
                  <option value="snacks_sweets">Snacks & Sweets</option> 
                  <option value="beverages">Beverages</option> 
                  <option value="breakfast_cereal">Breakfast & Cereal</option> 
                  <option value="pasta_grains">Pasta & Grains</option> 
                  <option value="condiments_sauces">Condiments & Sauces</option> 
                  <option value="cooking_oils_vinegars">Cooking Oils & Vinegars</option> 
                  <option value="spices_seasonings">Spices & Seasonings</option> 
                  <option value="nuts_seeds">Nuts & Seeds</option> 
                  <option value="baking_ingredients">Baking Ingredients</option> 
                  <option value="baby_food_formula">Baby Food & Formula</option> 
                  <option value="pet_food">Pet Food</option>
                </TextField>
              </Box>
  
              {/* Brand */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Brand
                </Typography>
                <TextField fullWidth
                id="productBrand"
                variant="outlined"
                // onChange={(e) => {
                //   setBrandQuery(e.target.value)  
                // }}
                // value={brandQuery}   
                />
              </Box>
  
              {/* Price Range */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Price Range
                </Typography>
                <TextField fullWidth id="minPrice"
                variant="outlined"
                type="number"
                placeholder="Min Price"
                // value={minPrice}   
                // onChange={(e) => setMinPrice(e.target.value)}
                />
                <TextField fullWidth
                id="maxPrice"
                variant="outlined"
                type="number"
                placeholder="Max Price"
                // value={maxPrice}   
                // onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Box>
  
              {/* Store Name */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Store Name
                </Typography>
                <TextField fullWidth
                id="storeName" 
                variant="outlined"
                // onChange={(e) => {
                //   setStoreQuery(e.target.value)  
                // }}
                // value={storeQuery}   
                />
              </Box>
  
              {/* Store Location */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Store Location
                </Typography>
                <TextField fullWidth
                id="storeLocation"
                variant="outlined"
                // onChange={(e) => {
                //   setLocationQuery(e.target.value)  
                // }}
                // value={locationQuery}   
                />
              </Box>
  
              {/* Reset Button */}
              <Button fullWidth
              variant="outlined"
              sx={{ color: '#022D5E', border: "1px solid #022D5E" }}
              onClick={() => {
                setDiscoverQuery("")  
              }}
              >
                Reset all
              </Button>
            </Paper>

          </Grid>

            {/* Right column for the cards grid */}
            <Grid item xs={12} md={9}>
              <Paper sx={{ p: 2, border: "1px solid #ccc", borderRadius: 4 }}>
                <Grid container spacing={2}>
                <AllProducts
                   discoverQuery={discoverQuery}

                  // nameQuery={nameQuery}  
                  // categoryQuery={categoryQuery}  
                  // brandQuery={brandQuery}  
                  // minPrice={minPrice}  
                  // maxPrice={maxPrice}
                  // storeQuery={storeQuery}  
                  // locationQuery={locationQuery}  
                />
                </Grid>
              </Paper>
            </Grid>
        
            {/* <Grid item xs={12} md={9}>
              <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
                <Grid container spacing={2}>
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <AllImages
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
        
        <Footer/>
      </main>
    </ThemeProvider>
  );
}

export default Discover;
