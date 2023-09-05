import * as React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    try {
      let user = {
        username,
        password
      }
      console.log(user)
      let response = await axios.post("https://grocery-wise.onrender.com/api/auth/signup", user)
      if (response) {
        localStorage.setItem("token", response.data.token)
        alert(response.data.msg);
        setTimeout(()=>navigate("/dashboard") , 1000 )
      }
    } catch (error) {
      alert(error.response.data.msg) 
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#fceae3', // Set the background color of the entire page
          minHeight: '100vh', //cover the full viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">        
        <Box
          sx={{
            bgcolor: "white",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "20px",
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Enter your email address"
                  name="email"
                  autoComplete="email"
                  value={username}
                  onChange={(event)=>setUsername(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label=" Enter you password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event)=>(setPassword(event.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#022D5E" }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Box>
      
    </ThemeProvider>
  );
}

export default  Signup;