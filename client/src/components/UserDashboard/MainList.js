import React, { useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MainListItem = ({ title, details, onDeleteItem }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem onClick={handleToggle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {details.map((item, index) => (
            <ListItem key={index}>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                <IconButton edge="start" aria-label="edit">
                  <EditIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const MainList = () => {
  const [selectedList, setSelectedList] = useState("Weekly Needs");
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState({
    "Weekly Needs": [],
    "Temporary Needs": [],
    Favorites: [],
  });

  const endPath = {
    "Weekly Needs": "weekly",
    "Temporary Needs": "temporary",
    "Favorites": "favorites",
  };

  const handleAddItem = async () => {
    if (inputValue.trim() !== "") {
      try {
        let newItem = { name: inputValue };
        const path = endPath[selectedList];
        const response = await axios.post(`http://localhost:3636/api/${path}`, newItem, 
        {
          headers: {
            Authorization:  `Bearer ${localStorage.getItem('token')}`
          }
        }
        );
        console.log(response);
        if (response) {
          alert(response.data.msg);
          setLists((prevLists) => ({
            ...prevLists,
            [selectedList]: [...prevLists[selectedList], { name: inputValue }],
          }));
          setInputValue("");
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

  const handleDeleteItem = (listTitle, index) => {
    setLists((prevLists) => ({
      ...prevLists,
      [listTitle]: prevLists[listTitle].filter((_, i) => i !== index),
    }));
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
      <Button variant="contained" color="primary" onClick={handleAddItem} sx={{ mb: "10px" }}>
        Add
      </Button>
      <Grid container spacing={2}>
        {Object.entries(lists).map(([title, details]) => (
          <Grid item xs={12} sm={4} key={title}>
            <List sx={{ bgcolor: "#f5f5f5" }}>
              <MainListItem title={title} details={details} onDeleteItem={(index) => handleDeleteItem(title, index)} />
            </List>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainList;
