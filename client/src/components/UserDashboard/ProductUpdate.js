import React, {  useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


function ProductUpdate() {
    const {id} = useParams();
    const navigate = useNavigate();
     // eslint-disable-next-line
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [store, setStore] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

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
  
    // Function to perform geocoding using Google Maps Geocoding API
    const geocodeLocation = (location) => {
      const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`;
  
      return fetch(geocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            return { latitude: lat, longitude: lng };
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.error("Error geocoding location:", error);
          return null;
        });
    };
  
    const onChangeGeoLocation = (e) => {
      const locationValue = e.target.value;
  
      geocodeLocation(locationValue)
        .then((coordinates) => {
          if (coordinates) {
            setLatitude(coordinates.latitude);
            setLongitude(coordinates.longitude);
          } else {
            // Handle case where location couldn't be geocoded
            setLatitude("");
            setLongitude("");
          }
        })
        .catch((error) => {
          // Handle error from geocoding service
          console.error("Error geocoding location:", error);
          setLatitude("");
          setLongitude("");
        });
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    
    useEffect(() => {
      async function fetchProduct() {
        const response = await axios.get(`http://localhost:3636/api/products/${id}`, { headers });
        setProduct(response.data);
        console.log(response.data)
      }
      fetchProduct();
      // eslint-disable-next-line 
    }, [id])

    const handleUpdate = (e) => {
      e.preventDefault();
      
      const updatedProduct = {
        image,
        name,
        description,
        category,
        brand,
        price,
        store,
        latitude,
        longitude
      };

      try {
        axios.put(`http://localhost:3636/api/products/${id}`, updatedProduct, { headers })
        .then(res => {
          alert("Updated product successfully");
          navigate("/dashboard")
        })
      } catch (error) {
        console.log(`Error updating ${name}:`, error);
      }
    }

    // if (!product) return <p>Loading...</p>


    return ( 
      <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Update Product Details
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
        <TextField
          label="Geographic Location"
          variant="outlined"
          onChange={onChangeGeoLocation} // Update this line to use the onChangeGeoLocation function
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleUpdate}>
          Submit!
        </Button>
      </Box>
    </Container>
     );
}

export default ProductUpdate;