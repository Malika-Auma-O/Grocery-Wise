import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Container, Typography } from '@mui/material';


function ProductList() {
    const [productCount, setProductCount] = useState(0);
    const [groceryCount, setGroceryCount] = useState(0);
    const [myMarketCount, setMyMarketCount] = useState(0);
    const [userProductCount, setUserProductCount] = useState(0);
  
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/grocery/products/count`)
            .then(response => {
                setProductCount(response.data.count);
            })
            .catch(error => {
                console.error("Error fetching product count:", error);
            });
    }, []);
  
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/grocery/products/count?source=Bazaar`)
            .then(response => {
                setGroceryCount(response.data.count);
            })
            .catch(error => {
                console.error("Error fetching Bazaar product count:", error);
            });
    }, []);
  
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/grocery/products/count?source=MyMarket`)
            .then(response => {
                setMyMarketCount(response.data.count);
            })
            .catch(error => {
                console.error("Error fetching MyMarket product count:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch all products from the backend
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
          .then(response => {
            setUserProductCount(response.data);
          })
          .catch(error => {
            console.error("Error fetching products:", error);
          });
      }, []);
  
    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Products Information
            </Typography>
            <Typography variant="body1">
                Total number of products: {productCount}
            </Typography>
            <Typography variant="body1">
                Total number of products from Bazaar: {groceryCount}
            </Typography>
            <Typography variant="body1">
                Total number of products from MyMarket: {myMarketCount}
            </Typography>
            <Typography variant="body1">
                Total number of products added by Users: {userProductCount.length}
            </Typography>
        </Container>
    );
  }
  

export default ProductList;