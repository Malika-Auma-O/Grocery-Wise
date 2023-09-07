import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CompareCard from '../cards/CompareCard';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import Footer from '../Footer';

const defaultTheme = createTheme();

function CompareDetails() {
    const location = useLocation();
    const selectedProduct = location.state.product;
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSourceLocation = (source) => {
        switch (source) {
          case "Bazaar":
            return "https://www.bazaar-online.gr/";
          case "MyMarket":
            return "https://www.mymarket.gr/";
          case "Sklavenitis":
            return "https://www.sklavenitis.gr/";
          default:
            return "";
        }
      };
    
      const locationUrl = getSourceLocation(selectedProduct.source)

    useEffect(() => {
        async function fetchSimilarProducts() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/grocery/products/search?name=${selectedProduct.title}`);
                const data = await response.json();
                setSimilarProducts(data);
                // Data has been loaded, so set isLoading to false
                setIsLoading(false);
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
                            <Typography variant="h5" align="center" paragraph>
                                Compare Prices and view related products
                            </Typography>
                        </Container>
                    </Box>
                    <Container sx={{ py: 4 }} maxWidth="md">
                        {isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Paper sx={{ p: 2, border: '1px solid #ccc', borderRadius: 4 }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} sx={{ width: "200px" }}>
                                        <CompareCard
                                            image={selectedProduct.imgSrc}
                                            // name={selectedProduct.title}
                                            // source={selectedProduct.source}
                                            // price={selectedProduct.source === 'Bazaar' ? selectedProduct.price : selectedProduct.source === 'MyMarket' ? selectedProduct.finalMeasurementPrice : selectedProduct.source === 'Sklavenitis' ? selectedProduct.unitPrice: selectedProduct.price}
                                            // weight={selectedProduct.source === 'Bazaar' ? selectedProduct.reducedPrice : selectedProduct.source === 'MyMarket' ? selectedProduct.finalMeasurementPrice : selectedProduct.source === 'Sklavenitis' ? selectedProduct.highlightMeasurementPrice : selectedProduct.price}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={7} sx={{ ml: "50px" }}>
                                        <Typography variant="h6" sx={{ mt: 2 }}>
                                            Name: {selectedProduct.title}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                            Brand: {selectedProduct.brand}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ mt: 2 }}>
                                        Price: {selectedProduct.source === 'Bazaar' ? selectedProduct.price : selectedProduct.source === 'MyMarket' ? selectedProduct.finalMeasurementPrice : selectedProduct.source === 'Sklavenitis' ? selectedProduct.unitPrice: selectedProduct.price}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                        Price per kilo/litre: {selectedProduct.source === 'Bazaar' ? selectedProduct.reducedPrice : selectedProduct.source === 'MyMarket' ? selectedProduct.finalMeasurementPrice : selectedProduct.source === 'Sklavenitis' ? selectedProduct.highlightMeasurementPrice : selectedProduct.price}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            Store: {selectedProduct.source}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            Store website: <Link href={locationUrl} target="_blank" rel="noopener noreferrer">
                                            {locationUrl}
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}

                    </Container>
                    <Container sx={{ py: 4 }} maxWidth="md">
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            Similar Products
                        </Typography>
                        <Grid container spacing={2}>
                            {similarProducts.filter(prod => prod._id !== selectedProduct._id).map((product, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <CompareCard
                                            image={product.imgSrc}
                                            name={product.title}
                                            source={product.source}
                                            price={product.source === 'Bazaar' ? product.price : product.source === 'MyMarket' ? product.finalMeasurementPrice : product.source === 'Sklavenitis' ? product.unitPrice: product.price}
                                            weight={product.source === 'Bazaar' ? product.reducedPrice : product.source === 'MyMarket' ? product.finalMeasurementPrice : product.source === 'Sklavenitis' ? product.highlightMeasurementPrice : product.price}
                                        />
                                </Grid>
                            ))}

                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
            <Footer />
        </div>

    );
}

export default CompareDetails;
