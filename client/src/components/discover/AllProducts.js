import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomCard from "../cards/CustomCard";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useLocation } from "react-router-dom";


const AllProducts = ({ discoverQuery }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedList, setSelectedList] = useState("Temporary Needs");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [displayCount, setDisplayCount] = useState(10);
  const productsPerLoad = 10; // Number of products to load per button click
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    let query = "";
  
    if(searchQuery) {
      query = searchQuery; 
    }
  
    if(discoverQuery) {
      query = discoverQuery;
    }
  
    if(query.trim() === '') {
      getAllImages();
    } else {
      getFilteredImages(query); 
    }
  // eslint-disable-next-line
  }, [searchQuery, discoverQuery])
  

  // clear searched query from the search in hero page
    const clearSearch = () => {
      const params = new URLSearchParams(location.search);
      params.delete('q');
      navigate({search: params.toString()})
    }
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      if(params.get('q')){
        // fetch filtered data
      } else {
        // fetch all data
      }
    }, [location.search])

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getAllImages = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, { headers })
      .then((res) => {
        // Reverse the images array to display the latest image first
        setImages(res.data.reverse());
        // Data has been loaded, so set isLoading to false
      setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting images:", err);
      });
  };

  const getFilteredImages = (query) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/search?q=${query}`, { headers })
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.error("Error getting requested products:", err);
      })
  }

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
  

  function compareDetails(image) {
    navigate("/compare", { state: { image } });
  }

  return (
    <Grid     sx={{ m: 1 }}
    container spacing={2} >

{isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <CircularProgress />
          </div>
            ) : (
            <Grid
            sx={{ m: 1 }}
            container spacing={2}
            >
              {images.slice(0, displayCount).map((image, index) => (
        <Grid 
        item xs={12} sm={6} md={4} key={index}>
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
            onClearSearch={() => clearSearch()}
          />
        </Grid>
      ))}
              
            </Grid> )}
      
      <Button
      sx={{ bgcolor: '#022D5E' }}
        variant="contained"
        fullWidth
        onClick={() => {
          setDisplayCount(displayCount + productsPerLoad);
        }}
      >
        Show More
      </Button>


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
          <Button 
          sx={{ color: '#022D5E' }}
          onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
          sx={{ color: '#022D5E' }}
          onClick={handleListChange} >
            Add to List
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AllProducts;
