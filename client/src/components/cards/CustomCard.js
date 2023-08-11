import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button, IconButton} from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";
import RefreshIcon from '@mui/icons-material/Refresh';
import "../cards/CardStyle.css";

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

const CustomCard = (props) => {
  const [editableRating, setEditableRating] = useState(props.rating);

  const onChangeRating = (event, newRating) => {
    setEditableRating(newRating);
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
        {props.showCompare ? (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography>{props.description}</Typography>
            <Typography>Category: {props.category}</Typography>
            <Typography>Brand: {props.brand}</Typography>
            <Typography>Price: {formatAmountInEuro(props.price)}</Typography>
            <Typography>Store: {props.store}</Typography>
            <Typography>Location: {props.location.latitude}, {props.location.longitude}</Typography>
            <Rating
          name="rating"
          value={editableRating}
          precision={0.5}
          onChange={onChangeRating} 
        />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography>Price: {formatAmountInEuro(props.price)}</Typography>
            <Rating
          name="rating"
          value={editableRating}
          precision={0.5}
          onChange={onChangeRating} 
        />
          </>
        )}
      </CardContent>
      <CardActions>
        {props.showCompare ? (
          <Button 
          sx={{ color: '#022D5E' }}
          size="small" onClick={props.onAddToList}>
            Add to List
          </Button>
        ) : (
          <>
            <Button
            sx={{ color: '#022D5E' }}
             size="small" onClick={props.onCompareClick}>
              Compare
            </Button>
            <Button
             sx={{ color: '#022D5E' }}
             size="small" onClick={props.onAddToList}>
              Add List
            </Button>
            <IconButton onClick={props.onClearSearch}>
              <RefreshIcon/>
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CustomCard;
