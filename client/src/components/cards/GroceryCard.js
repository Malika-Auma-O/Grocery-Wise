import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, IconButton, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../cards/CardStyle.css";

const formatAmountInEuro = (amount) => {
  if (amount !== undefined) {
    return amount.toLocaleString("en-GB", {
      style: "currency",
      currency: "EUR",
    });
  }
  return "";
};

const GroceryCard = (props) => {
  const [editableRating, setEditableRating] = useState(props.rating);

  const onChangeRating = (event, newRating) => {
    setEditableRating(newRating);
  };

  return (
    <Card className="card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          
            pt: '100%',
          }}
        image={props.imgSrc}
        alt={props.title}
        loading="lazy"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {props.showCompare ? (
          <>
            <Typography gutterBottom variant="h6" component="h6">
              {props.title}
            </Typography>
            <Typography>{props.description}</Typography>
            <Typography>Category: {props.category}</Typography>
            <Typography>Brand: {props.brand}</Typography>
            <Typography>Price: {formatAmountInEuro(props.price)}</Typography>
            <Typography>Store: {props.source}</Typography>
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
            <Typography gutterBottom variant="h6" component="h6">
              {props.title}
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
        
        {props.source === "Bazaar" ? (
          <>
            <Typography variant="body2" color="textSecondary">
              Brand: {props.brand}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price per kilo/litre: {props.reducedPrice}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price: {formatAmountInEuro(props.price)}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" color="textSecondary">
              Price per kilo/litre: {props.finalMeasurementPrice    }
            </Typography>
            {props.sellingPrice && (
              <Typography variant="body2" color="textSecondary">
                Price: {formatAmountInEuro(props.sellingPrice)}
              </Typography>
            )}
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

export default GroceryCard;