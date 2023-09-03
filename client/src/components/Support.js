import React from "react";
import Box from "@mui/material/Box";
import {Typography, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();

  const toFAQ = () =>{
    navigate("/faq");
  }
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" align="center"  paragraph>
      Help and support
      </Typography>
      <Typography align="center" color="text.secondary" paragraph>
      Grocery Wise is dedicated to making your grocery shopping experience easier and more efficient. With our price comparison feature, you can find the best deals on your favorite products!.
      </Typography>
      <Button
      sx={{ bgcolor: '#022D5E', color: "white", ml: "30%" }}
       onClick={toFAQ}
      >Go To FAQ's</Button>
    </Box>
    
  );
};

export default Support;
