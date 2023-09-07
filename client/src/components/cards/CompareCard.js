import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button, } from '@mui/material';
import Typography from '@mui/material/Typography';
// import Rating from "@mui/material/Rating";
// import RefreshIcon from '@mui/icons-material/Refresh';
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

const CompareCard = (props) => {
//   const [editableRating, setEditableRating] = useState(props.rating);

//   const onChangeRating = (event, newRating) => {
//     setEditableRating(newRating);
//   };


  
  return (
    <div>
        <Card className="card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          pt: '100%',
        }}
        image={props.image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
       
          <>
            <Typography sx={{fontSize: "14px"}} gutterBottom variant="h6" component="h6">
              {props.name}
            </Typography>
            <Typography sx={{fontSize: "14px"}}>Price: {formatAmountInEuro(props.price)}</Typography>
            <Typography sx={{ fontSize: '14px' }}>
                  Price per kilo/litre: {props.weight}
            </Typography>
            {/* <Rating
              name="rating"
              value={editableRating}
              precision={0.5}
              onChange={onChangeRating} 
            /> */}
            <Typography sx={{fontSize: "14px"}}s>Store: {props.source}</Typography>
            
          </>
        
      </CardContent>
      <CardActions>
          <>
            <Button
              sx={{ color: '#022D5E' }}
              size="small" onClick={props.onAddToList}>
              Add-List
            </Button>
          </>
      
      </CardActions>
    </Card>
   
    </div>
    
  );
};

export default CompareCard;
