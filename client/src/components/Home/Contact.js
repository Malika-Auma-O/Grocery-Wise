import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../Footer";

const Contact = () => {
  return (
    <div>
      {/* Top Section */}
      <div
        style={{
          backgroundColor: "#fceae3",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            padding: "50px",
            margin: "0 auto", 
            maxWidth: "1200px", 
          }}
        >
          {/* Left Column */}
          <Grid item xs={12} md={5}
          sx={{ml: "40px"}}
          >
            <Typography variant="h4">Contact Us</Typography>
            <br></br>
            <Typography variant="body1">
              Email: wisegrocery@gmail.com
            </Typography>
            <br></br>
            <Typography variant="body1">
              Phone: +30 (123) 456-7890
            </Typography>
            <br></br>
            <Typography variant="body1">
              Address: 123 Main Street, Athens, Greece
            </Typography>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }} // White background color
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }} // White background color
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }} // White background color
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }} // White background color
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                  sx={{ bgcolor: '#022D5E' }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>

      {/* Google Maps Section */}
      <Grid maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", mx: "auto", mt: "30px"}}
      >
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3145.0765603387113!2d23.73229517589292!3d37.97534257193551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssyntagma%20maps!5e0!3m2!1sen!2sgr!4v1691772804781!5m2!1sen!2sgr"
        width="100%"
        height="450"
        style={{ border: 0, marginTop: "30px" }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      </Grid>
      <Footer/>
    </div>
  );
};

export default Contact;
