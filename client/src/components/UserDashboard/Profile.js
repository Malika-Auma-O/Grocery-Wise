import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    profilePicture: "",
    avatarPublicId: "",
    dateOfBirth: "",
    location: "",
    phone: "",
    isAdmin: false,
  });

  // Simulate fetching user data from the backend API
  useEffect(() => {
    setUser({
      firstName: "mal",
      lastName: "saa",
      username:"johndoe@example.com",
      address: "123 Main Street",
      profilePicture: "url",
      avatarPublicId: "avatarPublicId",
      dateOfBirth: "2000-01-01",
      location: "Athens",
      phone: "1234567890",
      isAdmin: false,
    });
  }, []);

  const updateProfile = () => {
    console.log("update profile");
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="First Name"
        value={user.firstName}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <TextField
        label="Last Name"
        value={user.lastName}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <TextField
        label="Username"
        value={user.username}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <TextField
        label="Address"
        value={user.address}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, address: e.target.value })}
      />
      <TextField
        label="Profile Picture"
        value={user.profilePicture}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, profilePicture: e.target.value })}
      />
      <TextField
        label="Avatar Public ID"
        value={user.avatarPublicId}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, avatarPublicId: e.target.value })}
      />
      <TextField
        label="Date of Birth"
        value={user.dateOfBirth}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
      />
      <TextField
        label="Location"
        value={user.location}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, location: e.target.value })}
      />
      <TextField
        label="Phone"
        value={user.phone}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={updateProfile}>
        Update Profile
      </Button>
    </Box>
  );
};

export default Profile;
