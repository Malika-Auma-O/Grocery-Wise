import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Footer from "../Footer";

const Faq = () => {
    const navigate =useNavigate();

    const toContact = () => {
        navigate("/contact")
      }

  return (
    <div>
        <div style={{ backgroundColor: "#fceae3", padding: "50px" }}>
      <Grid 
      maxWidth="md"
      sx={{ mx: "auto" }}
      container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Frequently Asked Questions</Typography>
        </Grid>
        <Grid 
        item xs={12} md={6}>
         
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">What is Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Grocery Wise is an online platform that allows you to compare prices of grocery items from various stores. You can search for products, view prices from different retailers, and make informed decisions about where to shop.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How can I search for specific grocery items on Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                To search for a specific grocery item, use the search bar at the top of the page. Type in the name of the product, and relevant search results will be displayed, showing prices from different stores.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Can I create an account on Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Yes, you can create a free account on Grocery Wise. By signing up, you'll have access to features like saving your favorite items, creating shopping lists, and receiving personalized recommendations.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Is Grocery Wise available as a mobile app?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Currently, Grocery Wise is available as a web-based platform accessible through web browsers on your computer, tablet, or smartphone. We're working on developing a mobile app for your convenience.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How frequently are prices updated on Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Prices on Grocery Wise are updated regularly, usually on a daily basis. However, please note that prices might vary based on store availability and promotions.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} md={6}>
         
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Can I trust the accuracy of the prices listed?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We strive to provide accurate and up-to-date information. However, please keep in mind that prices can change due to store promotions, stock availability, or other factors. Always double-check the price with the store before making a purchase.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Can I make purchases directly through Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Grocery Wise is a price comparison tool, not an online store. You can view prices and product information on our platform, but you'll need to visit the respective store's website or physical location to make a purchase.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How can I contact customer support for assistance?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you have any questions or need assistance, you can visit our Contact Us page or send an email to support@grocerywise.com. Our customer support team will be happy to help you.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Are my personal details and shopping history secure on Grocery Wise?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We take your privacy seriously. Your personal details and shopping history are encrypted and stored securely. We do not share your information with third parties without your consent.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <br></br>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How do I provide feedback or suggest improvements?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We value your feedback! You can provide feedback by clicking on the "Feedback" link in the navigation menu. Your suggestions help us enhance your shopping experience.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      
      <Grid container justifyContent="center" sx={{ marginTop: "50px" }}>
        <Button
        onClick={toContact}
        sx={{ bgcolor: '#022D5E' }}
          variant="contained"
          color="primary"
          size="large"
          href="/contact"
        >
          Contact Us
        </Button>
      </Grid>
    </div>
    <Footer/>
    </div>
    
  );
};

export default Faq;
