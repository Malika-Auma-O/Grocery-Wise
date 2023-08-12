import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Rating from "@mui/material/Rating"
import Footer from "../Footer";

const ProductsForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [rating, setRating] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);;

  const onChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }

    setImage(file);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onChangeBrand = (e) => {
    setBrand(e.target.value);
  };

  const onChangePrice = (e) => {
    // Convert the value to a number before setting it in the state
    setPrice(Number(e.target.value));
  };

  const onChangeStore = (e) => {
    setStore(e.target.value);
  };

  const onChangeRating = (e, value) => {
    // Convert the value to a number before setting it in the state
    setRating(parseFloat(value));
  };

 

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("store", store);
    formData.append("rating", rating);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post("http://localhost:3636/api/products", formData, { headers })
      .then((res) => {
        alert("Image added successfully!");
      })
      .catch((err) => {
        console.error("Error adding image:", err);
      });

    setImage(null);
    setName("");
    setDescription("");
    setCategory("");
    setBrand("");
    setPrice("");
    setStore("");
    setRating("");
    setPreviewUrl(null);
  };

  return (
    <Box
<<<<<<< HEAD
    sx={{bgcolor: "#fceae3",}}
=======
    sx={{bgcolor: "#fcf3ee",}}
>>>>>>> 30ab31a486e3c8e228c90eba5e5522040485269e
    >
      <Container maxWidth="sm"
      
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
            bgcolor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            
          }}
        >
          <Typography variant="h4" gutterBottom>
            Product Form
          </Typography>
          <label htmlFor="image-input">
            <input
              accept="image/*"
              type="file"
              id="image-input"
              style={{ display: "none" }}
              onChange={onChangeImage}
            />
            <Button
            sx={{ bgcolor: "#022D5E"}}
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Choose an Image
            </Button>
          </label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
            />
          )}
          {image && <Typography>{image.name}</Typography>}
          <TextField
            label="Name and weight: 'Chocolate Bar (100g)'"
            variant="outlined"
            value={name}
            onChange={onChangeName}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={onChangeDescription}
            fullWidth
          />
          
          <TextField
            label="Category"
            variant="outlined"
            value={category}
            onChange={onChangeCategory}
            fullWidth
            select
            SelectProps={{ native: true }}
          >
            <option value=""></option>
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
                  
          <TextField
            label="Brand"
            variant="outlined"
            value={brand}
            onChange={onChangeBrand}
            fullWidth
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number" // Change the input type to "number"
            value={price.toString()} // Convert the value to a string when using in TextField
            onChange={onChangePrice}
            fullWidth
            inputProps={{ step: "0.01" }} // Set the step to allow decimal values
          />
          <TextField
            label="Store"
            variant="outlined"
            value={store}
            onChange={onChangeStore}
            fullWidth
          />
 
          <Rating
            name="rating"
            value={Number(rating)} // Convert the value to a number here
            onChange={onChangeRating}
            precision={0.5}
          />
          <Button
          sx={{bgcolor: "#022D5E"}}
           type="submit" variant="contained" color="primary" onClick={onSubmit}>
            Submit!
          </Button>
        </Box>
        
      </Container>
      <Footer/>
    </Box>
    
  );
};

export default ProductsForm;
