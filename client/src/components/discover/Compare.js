import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomCard from "../cards/CustomCard";
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import Footer from '../Footer';

const defaultTheme = createTheme();

function CompareDetails() {
    const location = useLocation();
    const selectedProduct = location.state.product;
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        async function fetchSimilarProducts() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/grocery/products/search?name=${selectedProduct.title}`);
                const data = await response.json();
                setSimilarProducts(data);
            } catch (error) {
                console.error("Failed to fetch similar products:", error);
            }
        }

        fetchSimilarProducts();
    }, [selectedProduct.title]);

    return (
        <div>
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
                    <Container maxWidth="lg">
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                      Compare Prices and view related products
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 4 }} maxWidth="md">
                    <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} sx={{width: "200px"}}>
                                <CustomCard
                                    image={selectedProduct.imgSrc}
                                    name={selectedProduct.title}
                                    price={selectedProduct.price}
                                    source={selectedProduct.source}
                                    // onAddToList={() => handleAddItemToList(product.name)}
                                    // showCompare={true} 
                                />
                            </Grid>
                            <Grid item xs={12} md={7} sx={{ml: "50px"}}>
                                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                    Category: {selectedProduct.category}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                    Brand: {selectedProduct.brand}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                    Description: {selectedProduct.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Store: {selectedProduct.source}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Location: {selectedProduct.source}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                <Container sx={{ py: 4 }} maxWidth="md">
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        Similar Products
                    </Typography>
                    <Grid container spacing={2}>
                      {similarProducts.filter(prod => prod._id !== selectedProduct._id).map((product, index) => (
                          <Grid item key={index} xs={12} sm={6} md={4}>
                              <CustomCard
                                  image={product.imgSrc}
                                  name={product.title}
                                  price={product.price}
                                  source={product.source}
                                //   showCompare={true} 
                                //   onAddToList={() => handleAddItemToList(product.name)}
                              />
                          </Grid>
                      ))}

                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
        <Footer/>
        </div>
        
    );
}

export default CompareDetails;
