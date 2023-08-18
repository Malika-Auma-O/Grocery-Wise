import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import Footer from '../Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Grid container maxWidth="md">
        <Box
          sx={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            p: 6,
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            bgcolor: "white",
            m: "50px"
          }}
        >
          <Typography 
          sx={{
            width: "100%",
            paddingBottom: "15px",
            borderRadius: "12px",
          
            mt: 0
          }}
          variant="h4">Privacy Policy</Typography>

          <Typography variant="body1">
           Welcome to the Privacy Policy of Grocery-Wise ("the Site"). This Privacy Policy outlines how we collect, use, and protect user data.
          </Typography>
          <br></br>
          <Typography variant="h6">Introduction:</Typography>
          <Typography variant="body1">
            This Privacy Policy outlines how we collect, use, and protect user data on Welcome to the Privacy Policy of Grocery-Wise ("the Site").
          </Typography>
          <br></br>
          <Typography variant="h6">Information Collection:</Typography>
          <Typography variant="body1">
            We collect various types of information, including:
          </Typography>
          <ul>
            <li>User-provided data: This includes information you provide when registering for an account or using the Site, such as your name, email address, and preferences.</li>
            <li>Automatically collected data: We may collect information through cookies, web beacons, and other tracking technologies. This may include IP addresses, browser type, and browsing history.</li>
          </ul>
          <br></br>
          <Typography variant="h6">Data Usage:</Typography>
          <Typography variant="body1">
            We use the collected data for purposes such as:
          </Typography>
          <ul>
            <li>Improving the functionality and user experience of the Site.</li>
            <li>Providing personalized recommendations and offers.</li>
            <li>Analyzing usage patterns to enhance our services.</li>
          </ul>
          <br></br>
          <Typography variant="h6">Data Sharing:</Typography>
          <Typography variant="body1">
            We may share user data with third parties, including supermarkets and advertisers, to provide relevant information and offers. However, we do not sell or rent your personal information to third parties for their marketing purposes.
          </Typography>
          <br></br>
          <Typography variant="h6">Cookies and Tracking Technologies:</Typography>
          <Typography variant="body1">
            We use cookies, web beacons, and other tracking technologies to enhance your experience on the Site. These technologies help us collect and store information about your preferences and usage patterns. You can manage cookies through your browser settings.
          </Typography>
          <br></br>
          <Typography variant="h6">User Choices:</Typography>
          <Typography variant="body1">
            You have the right to:
          </Typography>
          <ul>
            <li>Access and update your account information.</li>
            <li>Opt-out of receiving marketing communications.</li>
            <li>Request the deletion of your account and associated data.</li>
          </ul>
          <br></br>
          <Typography variant="h6">Security Measures:</Typography>
          <Typography variant="body1">
            We implement security measures to protect user data from unauthorized access, alteration, or disclosure. However, no data transmission over the internet is entirely secure. Please use caution when sharing sensitive information.
          </Typography>
          <br></br>
          <Typography variant="h6">Third-Party Links:</Typography>
          <Typography variant="body1">
            The Site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
          </Typography>
          <br></br>
          <Typography variant="h6">Children's Privacy:</Typography>
          <Typography variant="body1">
            The Site is intended for users of all ages. If you are under the age of 18, please use the Site with parental or guardian consent.
          </Typography>
          <br></br>
          <Typography variant="h6">Changes to the Privacy Policy:</Typography>
          <Typography variant="body1">
            We may update this Privacy Policy from time to time. Any changes will be communicated to you through the Site.
          </Typography>
          <br></br>
          <Typography variant="h6">Contact Information:</Typography>
          <Typography variant="body1">
            If you have any questions or concerns about this Privacy Policy, please contact us at wisegrocery@gmail.com.
          </Typography>
        </Box>
      </Grid>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
