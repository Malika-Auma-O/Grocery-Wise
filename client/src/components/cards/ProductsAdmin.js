import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "../cards/CardStyle.css"

const formatAmountInEuro = (amount) => {
  if (amount !== undefined) {
    return amount.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'EUR'
    });
  }
  // If amount is undefined, return an empty string
  return '';
};

const ProductsAdmin = (props) => {
  const [editableRating, setEditableRating] = useState(props.rating);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const onChangeRating = (event, newRating) => {
    setEditableRating(newRating);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };


  
  return (
    <Card className="card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={props.image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
          <>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography>{props.description}</Typography>
            <Typography>Category: {props.category}</Typography>
            <Typography>Brand: {props.brand}</Typography>
            <Typography>Price: {formatAmountInEuro(props.price)}</Typography>
            <Typography>Store: {props.store}</Typography>          
          </>
       
      </CardContent>
      <CardActions>
        {/* Actions dropdown menu */}
        <Button 
        sx={{ color: '#022D5E' }}
        size="small" onClick={handleMenuOpen}>
          Actions
        </Button>
        <Menu
          anchorEl={menuAnchorEl} 
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >                 
          
          <MenuItem
          sx={{ color: '#022D5E' }}
           key="update" onClick={props.onUpdateClick}>
            Update  
          </MenuItem>
          
          <MenuItem
          sx={{ color: '#022D5E' }}
           key="delete" onClick={props.onDeleteClick}>
            Delete  
          </MenuItem>    
        </Menu>
      </CardActions>
    </Card>
  );
};

export default ProductsAdmin;
