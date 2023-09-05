// import React, { useState } from "react";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import GoogleMap from '@react-google-maps/api';

// const Map = () => {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState(''); 
//   const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const onChangeImage = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };

//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl(null);
//     }

//     setImage(file);
//   };

//   const onChangeName = (e) => {
//     setName(e.target.value);
//   };

//   const onChangeLocation = (e) => {
//     setLocation(e.target.value); 
//   }


//   const onSubmit = (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append("image", image);
//     formData.append("name", name);
//     formData.append("name", name);
//    formData.append("location", location); 

//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     };

//     axios
//       .post("https://grocery-wise.onrender.com/api/products", formData, { headers })
//       .then((res) => {
//         alert("Image added successfully!");
//       })
//       .catch((err) => {
//         console.error("Error adding image:", err);
//       });

//     setImage(null);
//     setName("");
//     setPreviewUrl(null);
  
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "1rem",
//           padding: "2rem",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Product Form
//         </Typography>
//         <label htmlFor="image-input">
//           <input
//             accept="image/*"
//             type="file"
//             id="image-input"
//             style={{ display: "none" }}
//             onChange={onChangeImage}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             component="span"
//             startIcon={<CloudUploadIcon />}
//           >
//             Choose an Image
//           </Button>
//         </label>
//         {previewUrl && (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
//           />
//         )}
//         {image && <Typography>{image.name}</Typography>}
//         <TextField
//           label="Name"
//           variant="outlined"
//           value={name}
//           onChange={onChangeName}
//           fullWidth
//         />
//         <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
//           Submit!
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Map;
