import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";

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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          <Button size="small" onClick={props.onAddToList}>
            Add to List
          </Button>
        ) : (
          <>
            <Button size="small" onClick={props.onCompareClick}>
              Compare
            </Button>
            <Button size="small" onClick={props.onAddToList}>
              Add to List
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CustomCard;
