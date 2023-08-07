import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const AvatarForm = () => {
  const [image, setImage] = useState(null);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("avatar", image);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post("http://localhost:3636/api/users/user", formData, { headers })
      .then((res) => {
        console.log("Avatar uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading avatar:", err);
      });

    setImage(null);
  };

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
          Upload Avatar
        </Typography>
        {image ? (
          <Avatar
            src={URL.createObjectURL(image)}
            sx={{ width: 120, height: 120 }}
          />
        ) : (
          <Avatar sx={{ width: 120, height: 120 }}>Avatar</Avatar>
        )}
        <label htmlFor="avatar-input">
          <input
            accept="image/*"
            type="file"
            id="avatar-input"
            style={{ display: "none" }}
            onChange={onChangeImage}
          />
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Avatar
          </Button>
        </label>
        {image && <Typography>{image.name}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!image}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AvatarForm;
