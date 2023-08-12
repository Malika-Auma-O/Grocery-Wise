import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainListItem from "./MainListItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


const MainList = () => {
  const [selectedList, setSelectedList] = useState("Weekly Needs");
  const [inputValue, setInputValue] = useState("");
  const {userId} = useParams();
  const [lists, setLists] = useState({
    "Weekly Needs": [],
    "Temporary Needs": [],
    "Favorites": []
  });

  const endPath = {
    "Weekly Needs": "weekly",
    "Temporary Needs": "temporary",
    "Favorites": "favorites",
  };

  const handleAddItem = async () => {
    if (inputValue.trim() !== "") {
      try {
        let newItem = { name: inputValue, userId };
        const path = endPath[selectedList];
        const response = await axios.post(`http://localhost:3636/api/user/${path}`, newItem, 
        {
          headers: {
            Authorization:  `Bearer ${localStorage.getItem('token')}`
          }
        }
        );
        // console.log(response);
        if (response && response.data) {
          alert(response.data.msg);
          setInputValue("");
          getAllLists();
        } else {
          console.log("Error adding to list.");
        }
      } catch (error) {  
        if (error.response && error.response.status === 401) {
          alert("Unauthorized access. Please log in first to create a list.");
        } else {
          console.log(error);
          alert("An error occurred while adding to the list.");
        }    
      }
    }
  };
  
  const getAllLists = async () => {
    try {
      const paths = Object.values(endPath);
      const responses = await Promise.all(
        paths.map((path) =>
          axios.get(`http://localhost:3636/api/user/${path}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        )
      );
  
      const newData = {
        "Weekly Needs": responses[0].data.reverse(),
        "Temporary Needs": responses[1].data.reverse(),
        "Favorites": responses[2].data.reverse(),
      };
  
      setLists(newData);
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching the lists.");
    }
  };

  useEffect(() => {
    getAllLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleDeleteItem = async (listTitle, item) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?")
      if (confirmDelete) {      
        await axios.delete(`http://localhost:3636/api/user/${endPath[listTitle]}/${item._id}`,  {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }      
        })      
        getAllLists();
      }   
    } catch (error) {      
      console.log('Error deleting list', error);
    }  
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemData, setEditItemData] = useState({
    listTitle: "",
    item: null,
    editedName: "",
  });

  const handleEditItem = (listTitle, item) => {
    setEditItemData({
      listTitle,
      item,
      editedName: item.name,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEditedItem = async () => {
    const { listTitle, item, editedName } = editItemData;
    try {
      const response = await axios.put(
        `http://localhost:3636/api/user/${endPath[listTitle]}/${item._id}`,
        { name: editedName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response && response.data) {
        alert(response.data.msg); 
        const updatedLists = { ...lists };
        const index = updatedLists[listTitle].findIndex((el) => el._id === item._id);
        if (index !== -1) {
          updatedLists[listTitle][index].name = editedName;
          setLists(updatedLists);
        }
        setEditDialogOpen(false);
      } else {
        console.log("Error updating the item.");
        alert("An error occurred while updating the item.");
      }
    } catch (error) {
      console.log("Error updating the item:", error);
      alert("An error occurred while updating the item.");
    }
  };
  

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        My grocery lists
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: "10px" }}>
        <InputLabel>List</InputLabel>
        <Select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          <MenuItem value="Weekly Needs">Weekly Needs</MenuItem>
          <MenuItem value="Temporary Needs">Temporary Needs</MenuItem>
          <MenuItem value="Favorites">Favorites</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={`Add item to ${selectedList}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddItem} sx={{ mb: "10px", bgcolor: "#022D5E" }}>
        Add to List
      </Button>
      <Grid container spacing={2}>
        {Object.entries(lists).map(([title, details]) => (
          <Grid item xs={12} sm={4} key={title}>
            <List sx={{ bgcolor: "#f5f5f5" }}>
              <MainListItem
                title={title}
                details={details}
                onDeleteItem={(item) => handleDeleteItem(title, item)}
                onEditItem={(item) => handleEditItem(title, item)} // Pass the onEditItem function
              />
            </List>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={editItemData.editedName}
            onChange={(e) => setEditItemData({ ...editItemData, editedName: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEditedItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainList;