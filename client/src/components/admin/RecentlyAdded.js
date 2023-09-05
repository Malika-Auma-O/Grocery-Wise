import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsAdmin from "../cards/ProductsAdmin";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const RecentlyAdded = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getAllImages = () => {
    axios
    .get("https://grocery-wise.onrender.com/api/user/recently-added-products", { headers })
    .then((res) => {
        setImages(res.data.reverse());
    })
    .catch((err) => {
        console.error("Error getting images:", err);
    });
  };
  
  useEffect(() => {
    getAllImages();
    // eslint-disable-next-line
  }, []);

  const handleUpdateClick = (image) => {
    navigate(`/update-product/${image._id}`)
  }

  const handleDeleteClick = (image) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (confirmDelete) {
      axios
      .delete(`https://grocery-wise.onrender.com/api/products/${image._id}`, { headers })
      .then((res) => {
        console.log("Product deleted successfully:", res.data);
        getAllImages();
      })
      .catch((err) => {
        console.error("Error getting images:", err);
      });
      
    }

  }

  return (
    <Grid     sx={{ m: 1 }}
    container spacing={2} >
      {images.map((image, index) => (
        <Grid 
        item xs={12} sm={6} md={4} key={index}>
          <ProductsAdmin
            image={image.image}
            name={image.name}
            description={image.description}
            category={image.category}
            brand={image.brand}
            price={image.price}
            store={image.store}
            rating={Number(image.rating)}
            onUpdateClick={() => handleUpdateClick(image)}
            onDeleteClick={() => handleDeleteClick(image)}
          />
        </Grid>
      ))}     
    </Grid>
  );
};

export default RecentlyAdded;