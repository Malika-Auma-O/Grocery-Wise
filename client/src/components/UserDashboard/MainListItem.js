import React, { useState} from "react";
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
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";

const MainListItem = ({ title, details, onDeleteItem, onEditItem }) => {
    const [open, setOpen] = useState(false);
  
    const handleToggle = () => {
      setOpen(!open);
    };
  
    return (
      <React.Fragment>
    <ListItem  onClick={handleToggle}>
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
            <ListItemText primary={item.name} />
            <ListItemIcon>
              <IconButton edge="start" aria-label="edit" onClick={() => onEditItem(item)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItemIcon>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(item)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Collapse>
  </React.Fragment>
  
    );
  };
  
  export default MainListItem