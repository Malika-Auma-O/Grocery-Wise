import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { 
    Card, CardContent, Typography, Grid, 
    CardMedia, Button, Select, MenuItem, 
    FormControl, InputLabel, CardActions
} from '@mui/material';
import "../cards/CardStyle.css";

function GroceryProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [source, setSource] = useState(""); // Empty string for both sources
    
    async function fetchData() {
        try {
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
    }, [source]);
    
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
                </Select>
            </FormControl>
    
            <Grid container spacing={2}>
                {products.map((product, index) => (
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
                                ) : (
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
                                )}
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
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {cursor && 
                <Button sx={{ bgcolor: '#022D5E' }}
                variant="contained"
                fullWidth
                onClick={fetchData}>
                    Load More
                </Button>
            }
        </div>
    );
    }
    
    export default GroceryProducts;