import React, {  useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import UserCard from "../cards/UserCard";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function HomeFeatures() {
    const { userId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedList, setSelectedList] = useState("Temporary Needs");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLists, setIsLoadingLists] = useState(true);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addItemToTemporaryList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/temporary`,
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Temporary Needs:", itemName);
      
      } else {
        console.log("Error adding to Temporary Needs.");
      }
    } catch (error) {
      console.log("Error adding to Temporary Needs:", error);
     
    }
    setIsLoadingLists(false); 
  };

  const addItemToWeeklyList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/weekly`,
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Weekly Needs:", itemName);
      } else {
        console.log("Error adding to Weekly Needs.");
      }
    } catch (error) {
      console.log("Error adding to Weekly Needs:", error);
    }
    setIsLoadingLists(false); 
  };

  const addItemToFavoritesList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/favorites`,
        newItem,
        { headers }
      );

      if (response && response.data) {
        alert("Item added to Favorites:", itemName);
      } else {
        alert("Error adding to Favorites.");
      }
    } catch (error) {
      alert("Error adding to Favorites:", error);
    }
    setIsLoadingLists(false); 
  };

  const handleAddItemToList = (itemName) => {
    if (itemName.trim() !== "") {
      console.log(itemName)
      setSelectedItemName(itemName);
      setOpenDialog(true);
    }
  };

  const handleListChange = async (event) => {
    const selectedListValue = event.target.value;
    setSelectedList(selectedListValue);
    setOpenDialog(false);
  
    if (selectedItemName.trim() !== "") {
      if (selectedListValue === "Temporary Needs") {
        await addItemToTemporaryList(selectedItemName);
      } else if (selectedListValue === "Weekly Needs") {
        await addItemToWeeklyList(selectedItemName);
      } else if (selectedListValue === "Favorites") {
        await addItemToFavoritesList(selectedItemName);
      }
    }
  };
  

  function compareDetails(product) {
    navigate("/compare", { state: { product } });
  }

   useEffect(() => {
    getAllImages();
    // eslint-disable-next-line
  }, []);

  const getAllImages = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/products`, { headers })
      .then((res) => {
        // Sort the images array based on the dateAdded in des order
        res.data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  
        // Reverse the sorted array to get the newest items first
        const newestFirstImages = res.data.reverse();
  
        // Get the last 4 images from the reversed array
        // const lastFourImages = newestFirstImages.slice(0, 4);
  
        // Set the state with the last 4 images
        setImages(newestFirstImages);

        // Data has been loaded, so set isLoading to false
      setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting images:", err);
      });
  };

  const handleUpdateClick = (image) => {
    navigate(`/update-product/${image._id}`)
  }

  const handleDeleteClick = (image) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (confirmDelete) {
      axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${image._id}`, { headers })
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" align="center"  paragraph>
              My Uploaded Products
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 4 }} maxWidth="lg">
        {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <CircularProgress />
          </div>
            ) : (
              <Grid container spacing={4}>
            {images.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <UserCard
                  image={image.image}
                  title={image.title}
                  description={image.description}
                  category={image.category}
                  brand={image.brand}
                  price={image.price}
                  store={image.store}
                  location={image.location}
                  rating={Number(image.rating)}
                  showCompare={false} // Hide additional details in Explore page
                  onAddToList={() => handleAddItemToList(image.name)}
                  onCompareClick={() => compareDetails(image)}
                  onUpdateClick={() => handleUpdateClick(image)}
                  onDeleteClick={() => handleDeleteClick(image)}
                />
              </Grid>
            ))}

                  {/* Dialog to select the list */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Select List</DialogTitle>
              <DialogContent>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>List</InputLabel>
                  <Select value={selectedList} onChange={handleListChange}>
                    <MenuItem value="Temporary Needs">Temporary Needs</MenuItem>
                    <MenuItem value="Weekly Needs">Weekly Needs</MenuItem>
                    <MenuItem value="Favorites">Favorites</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleListChange} color="primary">
                  Add to List
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
            )}
          
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default HomeFeatures