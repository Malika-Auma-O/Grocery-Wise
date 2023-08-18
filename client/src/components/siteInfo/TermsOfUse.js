import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import Footer from '../Footer';

const TermsOfUse = () => {
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
          <Typography variant="h4"
          sx={{
            width: "100%",
            paddingBottom: "15px",
            borderRadius: "12px",
            mt: 0
          }}
          >Grocery-Wise Terms of Use</Typography>
          <br></br>
          
          <Typography variant="body1">
            Welcome to Welcome to the Privacy Policy of Grocery-Wise ("the Site"). These Terms of Use ("Terms") govern your use of the Site. By accessing and using the Site, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Site.
          </Typography>
          <br></br>
          <Typography variant="h6">User Responsibilities:</Typography>
          <Typography variant="body1">
            The Site is available to users of all ages. By using the Site, you agree to comply with all applicable laws and regulations. You must use the Site only for lawful purposes and not engage in any illegal activities. You are not allowed to upload or transmit any malicious content, viruses, or harmful code. Additionally, you must not violate any intellectual property rights or proprietary rights of others.
          </Typography>
          <br></br>

          <Typography variant="h6">Data Usage:</Typography>
          <Typography variant="body1">
            The Site provides information sourced from external supermarkets. The information provided is for general informational purposes only and should not be considered as professional advice. While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy of prices, deals, or availability.
          </Typography>
          <br></br>

          <Typography variant="h6">Accuracy of Information:</Typography>
          <Typography variant="body1">
            We make efforts to provide accurate and current information on the Site. However, the accuracy, completeness, and reliability of the information cannot be guaranteed. Users are advised to verify information directly with the respective supermarkets.
          </Typography>
          <br></br>

          <Typography variant="h6">Site Access and Termination:</Typography>
          <Typography variant="body1">
            We reserve the right to suspend or terminate your access to the Site at our sole discretion if you misuse the Site or violate these Terms.
          </Typography>
          <br></br>

          <Typography variant="h6">Intellectual Property:</Typography>
          <Typography variant="body1">
            All content on the Site, including text, graphics, logos, images, and software, is protected by copyright and other intellectual property rights. Users may not reproduce, distribute, modify, or create derivative works based on the content without explicit permission.
          </Typography>
          <br></br>

          <Typography variant="h6">Limitation of Liability:</Typography>
          <Typography variant="body1">
            You acknowledge and agree that we are not liable for any damages, losses, or expenses arising from your use of or inability to use the Site. The Site is provided "as is" and "as available" without any warranties.
          </Typography>
          <br></br>

          <Typography variant="h6">Modification of Terms:</Typography>
          <Typography variant="body1">
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the revised Terms on the Site. Your continued use of the Site constitutes your acceptance of the modified Terms.
          </Typography>
          <br></br>

          <Typography variant="h6">Governing Law and Jurisdiction:</Typography>
          <Typography variant="body1">
            These Terms are governed by the laws of [Applicable Jurisdiction]. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of [Applicable Jurisdiction].
          </Typography>
        </Box>
      </Grid>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
