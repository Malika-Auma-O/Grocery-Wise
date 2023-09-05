import React, { useState, useEffect } from 'react';
import axios from "axios";
import {  useNavigate, useParams } from 'react-router-dom';
import { 
    Card, CardContent, Typography, Grid, 
    CardMedia, Button, Select, MenuItem, 
    FormControl, InputLabel, CardActions, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import "../cards/CardStyle.css";
import { useLocation } from "react-router-dom";

function GroceryProducts({ discoverQuery }) {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [source, setSource] = useState(""); // Empty string for both sources
    const [selectedList, setSelectedList] = useState("Temporary Needs");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addItemToTemporaryList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/temporary",
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Temporary Needs:", itemName);
      
      } else {
        console.log("Error adding to Temporary Needs.");
      
      }
    } catch (error) {
        if (error.response && error.response.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message);
          alert("sign in to add to list")
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error adding to temporary list", error.message);
        }
      }
  };

  const addItemToWeeklyList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/weekly",
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Weekly Needs:", itemName);
        // Handle successful addition, if needed
      } else {
        console.log("Error adding to Weekly Needs.");
       
      }
    } 
    catch (error) {
        if (error.response && error.response.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message);
          alert("sign in to add to list")
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error adding to weekly list", error.message);
        }
      }
  };

  const addItemToFavoritesList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/favorites",
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Favorites:", itemName);
        // Handle successful addition, if needed
      } else {
        alert("Error adding to Favorites.");
        // Handle error, if needed
      }
    } catch (error) {
        if (error.response && error.response.data) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message);
          alert("sign in to add to list")
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error adding to favorites", error.message);
        }
      }
    
  };

  const handleAddItemToList = (itemName) => {
    if (itemName.trim() !== "") {
      console.log(itemName)
      setSelectedItemName(itemName);
      setOpenDialog(true);
    }
  };

  const handleListChange = async (event) => {
    const selectedListValue = event.target.value;
    setSelectedList(selectedListValue);
    setOpenDialog(false);
  
    if (selectedItemName.trim() !== "") {
      if (selectedListValue === "Temporary Needs") {
        await addItemToTemporaryList(selectedItemName);
      } else if (selectedListValue === "Weekly Needs") {
        await addItemToWeeklyList(selectedItemName);
      } else if (selectedListValue === "Favorites") {
        await addItemToFavoritesList(selectedItemName);
      }
    }
  };

  async function fetchFilteredData(query) {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `http://localhost:3636/api/search/grocery?q=${encodedQuery}`;
      const response = await axios.get(url);
      const data = response.data;
  
      if (data && data.length > 0) {
        setProducts(data); // Replace existing products with the new filtered data
      } else {
        setProducts([]); // Clear products if no data is available
      }
    } catch (error) {
      console.error("Failed to fetch filtered data:", error);
    }
  }


    
  async function fetchData() {
    try {
      // console.log('Search Query:', searchQuery); 
      // console.log('Discover Query:', discoverQuery);
      if (searchQuery || discoverQuery) {
        await fetchFilteredData(searchQuery || discoverQuery);
        return;
      }
  
      let url = cursor ? `http://localhost:3636/api/grocery/products?cursor=${cursor}` : "http://localhost:3636/api/grocery/products";
      if (source) {
        url += `&source=${source}`;
      }
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...data]);
        const lastProduct = data[data.length - 1];
        setCursor(lastProduct._id);
      } else {
        setCursor(null);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [source, searchQuery, discoverQuery]);
    
    const handleSourceChange = (event) => {
        setProducts([]); // Clear previously fetched products
        setSource(event.target.value);
    };

    function compareDetails(product) {
        navigate("/compare", { state: { product } });
      }

      
    
    return (
        <div>
            <FormControl variant="filled" style={{ margin: 20 }}>
                <InputLabel>Select Source</InputLabel>
                <Select value={source} onChange={handleSourceChange}>
                    <MenuItem value=""><em>Both</em></MenuItem>
                    <MenuItem value="Bazaar">Bazaar</MenuItem>
                    <MenuItem value="MyMarket">MyMarket</MenuItem>
                    <MenuItem value="Sklavenitis">Sklavenitis</MenuItem>
                </Select>
            </FormControl>
    
            <Grid  container spacing={2}>
                {products.map((product, index) => {
                  console.log("Product title:", product.title);
                  console.log("Measurement Price:", product.highlightMeasurementPrice);
                  console.log("Unit Price:", product.unitPrice);
                
                 return (
                  
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                        className="card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
          
                                    pt: '100%',
                                  }}
                                image={product.imgSrc}
                                alt={product.title}
                                loading="lazy" 
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography sx={{fontSize: "14px", mb: "5px"}} variant="h6" component="h6">
                                    {product.title}
                                </Typography>
    
                                {product.source === "Bazaar" ? (
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            Brand: {product.brand}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Price per kilo/litre: {product.reducedPrice}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Price: {product.price}
                                        </Typography>
                                    </>
                                ) : product.source === "MyMarket" ? (
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            Price per kilo/litre: {product.finalMeasurementPrice}
                                        </Typography>
                                    
                                        {product.sellingPrice && (
                                            <Typography variant="body2" color="textSecondary">
                                                Price: {product.sellingPrice}
                                            </Typography>
                                        )}
                                     
                                    </>
                                ) : product.source === "Sklavenitis" ? (
                                  <>
                                  <Typography variant="body2" color="textSecondary">
                                        Price per kilo/litre: {product.highlightMeasurementPrice}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: {product.unitPrice}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price d: {product.deletedUnitPrice}
                                    </Typography>
                                  </>
                                ) : null
                              }
                                <Typography variant="body2" color="textSecondary">
                                                Store: {product.source}
                                            </Typography>
                            </CardContent>
                            <CardActions>
                             <Button
                                sx={{ color: '#022D5E' }}
                                size="small" onClick={() => compareDetails(product)}>
                                Compare
                             </Button>
                             <Button
                                sx={{ color: '#022D5E' }}
                                size="small" onClick={() => handleAddItemToList(product.title)}>
                                Add-list
                             </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
                }
                )}
            </Grid>
            {cursor && 
                <Button sx={{ bgcolor: '#022D5E' }}
                variant="contained"
                fullWidth
                onClick={fetchData}>
                    Load More
                </Button>
            }

            {/* Dialog to select the list */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select List</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined">
            <InputLabel>List</InputLabel>
            <Select value={selectedList} onChange={handleListChange}>
              <MenuItem value="Temporary Needs">Temporary Needs</MenuItem>
              <MenuItem value="Weekly Needs">Weekly Needs</MenuItem>
              <MenuItem value="Favorites">Favorites</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
          sx={{ color: '#022D5E' }}
          onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
          sx={{ color: '#022D5E' }}
          onClick={handleListChange} >
            Add to List
          </Button>
        </DialogActions>
      </Dialog>         

      
        </div>
    );
    }
    
    export default GroceryProducts;