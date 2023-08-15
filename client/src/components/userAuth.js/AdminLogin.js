import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e){
    e.preventDefault();
    try {
      let admin = {
        username,
        password
      }
      let response = await axios.post("http://localhost:3636/api/admin/login", admin)
      if (response) {
        // console.log(response.data.token)
        localStorage.setItem("token", response.data.token)
        alert(`Welcome ${admin.username}!`)
        setTimeout(()=>navigate("/dashboard"),1000) //redirect to home page after login with
        // window.location.reload()
      }
    } catch (error) {
      alert(error.response.data.msg)
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundColor: '#fceae3', 
          minHeight: '100vh', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            bgcolor: "white",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AdminPanelSettingsIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Admin Panel Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter admin username"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(event)=>setUsername(event.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter admin password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>(setPassword(event.target.value))}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#022D5E" }}
            >
              Sign In
            </Button>

            <Grid container>

              <Grid item>
                <Link href="/login" variant="body2">
                  {"Not an Admin? User Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Box>
      
    </ThemeProvider>
  );
}