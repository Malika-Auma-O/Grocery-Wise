import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Footer from "../Footer";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    profilePicture: "",
    avatarPublicId: "",
    dateOfBirth: "",
    location: "",
    phone: "",
    isAdmin: false,
  });

  useEffect(() => {
    fetchUserDetails(); // Fetch the user details when the component mounts
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3636/auth/user/3636");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send a POST request to the server with the updated user details
      await axios.post("http://localhost:3636/auth/user/3636", user);
      // Fetch the updated data after saving
      fetchUserDetails();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", e.target.files[0]);

      const response = await axios.post(
        "http://localhost:3636/auth/upload-image", // Replace with your image upload endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.data.imageUrl,
        avatarPublicId: response.data.publicId,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} sx={{ maxWidth: "1000px" }}>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
      
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  sx={{ mb: 2, width: "49%" }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  sx={{ mb: 2, width: "49%" }}
                />
              </Box>
      
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
          
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Date of Birth"
                fullWidth
                variant="outlined"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
        
              <TextField
                label="Location"
                fullWidth
                variant="outlined"
                name="location"
                value={user.location}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card elevation={3} sx={{ p: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Profile Picture
                </Typography>
                {/* Render the uploaded image */}
                {user.profilePicture && <img src={user.profilePicture} alt="Profile" />}
              </CardContent>
            </Card>
            <div>
              <strong>Upload Profile Picture</strong>
              <input type="file" onChange={handleImageUpload} />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </div>
    
  );
};

export default Profile;
