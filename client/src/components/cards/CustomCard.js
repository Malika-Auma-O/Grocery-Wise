import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomCard = (props) => {
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
        <Typography gutterBottom variant="h5" component="h2">
          {props.heading}
        </Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Price €</Button>
        <Button size="small">Compare</Button>
        <Button size="small">Add</Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
