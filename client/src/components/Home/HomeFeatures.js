import React, {  useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import CustomCard from '../cards/CustomCard'; 


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function HomeFeatures() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedList, setSelectedList] = useState("Temporary Needs");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addItemToTemporaryList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/temporary",
        newItem,
        { headers }
      );

      if (response && response.data) {
        console.log("Item added to Temporary Needs:", itemName);
      
      } else {
        console.log("Error adding to Temporary Needs.");
      
      }
    } catch (error) {
      console.log("Error adding to Temporary Needs:", error);
     
    }
  };

  const addItemToWeeklyList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/weekly",
        newItem,
        { headers }
      );

      if (response && response.data) {
        console.log("Item added to Weekly Needs:", itemName);
        // Handle successful addition, if needed
      } else {
        console.log("Error adding to Weekly Needs.");
        // Handle error, if needed
      }
    } catch (error) {
      console.log("Error adding to Weekly Needs:", error);
      // Handle error, if needed
    }
  };

  const addItemToFavoritesList = async (itemName) => {
    try {
      let newItem = { name: itemName, userId };
      const response = await axios.post(
        "http://localhost:3636/api/user/favorites",
        newItem,
        { headers }
      );

      if (response && response.data) {
        console.log("Item added to Favorites:", itemName);
        // Handle successful addition, if needed
      } else {
        console.log("Error adding to Favorites.");
        // Handle error, if needed
      }
    } catch (error) {
      console.log("Error adding to Favorites:", error);
      // Handle error, if needed
    }
  };

  const handleAddItemToList = (itemName) => {
    if (itemName.trim() !== "") {
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
  

  function compareDetails(image) {
    navigate("/compare", { state: { image } });
  }

   useEffect(() => {
    getAllImages();
    // eslint-disable-next-line
  }, []);

  const getAllImages = () => {
    axios
      .get("http://localhost:3636/api/products", { headers })
      .then((res) => {
        // Sort the images array based on the dateAdded in des order
        res.data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  
        // Reverse the sorted array to get the newest items first
        const newestFirstImages = res.data.reverse();
  
        // Get the last 4 images from the reversed array
        const lastFourImages = newestFirstImages.slice(0, 4);
  
        // Set the state with the last 4 images
        setImages(lastFourImages);
      })
      .catch((err) => {
        console.error("Error getting images:", err);
      });
  };
  


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
          <Container maxWidth="lg">
          <Typography variant="h5" align="center"  paragraph>
            Discover a Glimpse of Savings! 🛒✨ Unveil the Best Deals on Your Horizon with Our Featured Selection! Compare and Conquer Your Grocery List with Ease.
            <br></br> <br></br>
            <Link href="/discover"  underline="none" sx={{ bgcolor: '#022D5E', color: "white", borderRadius: "3px" , padding: "7px 12px" , fontSize: "15px", fontWeight: 500}}>
               COMPARE GROCERIES
            </Link>
          </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="lg">
          <Grid container spacing={4}>
            {images.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <CustomCard
                  image={image.image}
                  name={image.name}
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
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default HomeFeatures