import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Typography from "@mui/material/Typography";


function AdminProfile() {
  const token = localStorage.getItem("token");
  const decodedToken  = jwt_decode(token);

  const userId = decodedToken.userId; 
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    avatar: null,
 
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/profile/${userId}`, {headers});
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


    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/profile/${userId}`, formData, {headers});
      
      setUserData(response.data.updatedUser);
      alert("profile updated successfully")
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
             
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h6">Admin Profile</Typography>
            <Box >
            <Avatar src={userData.avatar} alt="User Avatar" sx={{ width: 100, height: 100}} />
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
            </Box>
          
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
            <Button
            sx={{ bgcolor: "#022D5E"}}
             type="submit" variant="contained" startIcon={<CloudUploadIcon />} >
              Save Changes
            </Button>
          </Box>
    </div>
    
    
  );
}

export default AdminProfile;
