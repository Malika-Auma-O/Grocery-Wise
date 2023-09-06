import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

 const useAddToList = () => {
  const { userId } = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedList, setSelectedList] = useState("Temporary Needs");

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
        `${process.env.REACT_APP_BACKEND_URL}/api/user/weekly`,
        newItem,
        { headers }
      );

      if (response && response.data) {
        console.log("Item added to Weekly Needs:", itemName);
     
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
        console.log("Item added to Favorites:", itemName);
     
      } else {
        console.log("Error adding to Favorites.");
        
      }
    } catch (error) {
      console.log("Error adding to Favorites:", error);
      
    }
  };

  const handleAddItemToList = (itemName) => {
    if (itemName.trim() !== "") {
      setSelectedItemName(itemName);
      setOpenDialog(true);
    }
  };

  const handleListChange = async () => {
    setOpenDialog(false);

    if (selectedItemName.trim() !== "") {
      if (selectedList === "Temporary Needs") {
        await addItemToTemporaryList(selectedItemName);
      } else if (selectedList === "Weekly Needs") {
        await addItemToWeeklyList(selectedItemName);
      } else if (selectedList === "Favorites") {
        await addItemToFavoritesList(selectedItemName);
      }
    }
  };

  return {
    openDialog,
    selectedItemName,
    selectedList,
    setOpenDialog,
    setSelectedItemName,
    setSelectedList,
    handleAddItemToList,
    handleListChange,
  };
};

export default useAddToList;


