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
import Container from "@mui/material/Container";
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
      console.log(response.data) 
      setUserData(response.data.updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 6, mb: 6 }}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ padding: 2 }}>
          {userData.avatar && <Avatar src={userData.avatar} alt="User Avatar" sx={{ width: 100, height: 100 }} />}
          <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
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
            <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    <Footer/>
    </Container>
    
  );
}

export default ProfilePage;
