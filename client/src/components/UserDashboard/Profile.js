import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Typography from "@mui/material/Typography";
import Footer from "../Footer";

function ProfilePage() {
  const token = localStorage.getItem("token");
  const decodedToken  = jwt_decode(token);

  const userId = decodedToken.userId; 
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    avatar: null,
    phone: "",  
  });

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
    // eslint-disable-next-line 
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3636/api/user/profile/${userId}`, {headers});
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserData((prevData) => ({ ...prevData, avatar: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', userData.avatar);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('username', userData.username);
    formData.append('address', userData.address);
    formData.append('phone', userData.phone);

    try {
      const response = await axios.put(`http://localhost:3636/api/user/profile/${userId}`, formData, {headers});
      
      setUserData(response.data.updatedUser);
      alert("profile updated successfully")
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
            mx: 6,
            
          }}
        >
          <Typography variant="h4" gutterBottom>
            Personal details
          </Typography>
        
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', height: '100vh', border: "1px solid #ccc", borderRadius: "8px", bgcolor: "#fceae3"  }}>

      <Grid item xs={12} md={3}>
        <Paper sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {userData.avatar && <Avatar src={userData.avatar} alt="User Avatar" sx={{ width: 120, height: 120}} />}
          <br></br>
          <Button
          sx={{ bgcolor: "#022D5E"}}
            variant="contained"
            component="label"
            startIcon={<AddAPhotoIcon  />}
          >
            Add Image 
            <input type="file" hidden name="avatar" accept="image/*" onChange={handleFileChange} />
          </Button>      
        </Paper>    
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper sx={{ padding: 2 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
            <TextField
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              label="First Name"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              label="Last Name"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              label="Username"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              label="Phone Number"
              fullWidth
              margin="normal"
            />
            <Button
            sx={{ bgcolor: "#022D5E"}}
             type="submit" variant="contained" startIcon={<CloudUploadIcon />} >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </Box>
    <Footer/>
    </div>
    
    
  );
}

export default ProfilePage;
