import { useState } from 'react';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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


function PasswordResetRequest() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/request-password`, {
        username
      });
      
      alert('Password reset email sent!');
      setTimeout(()=>navigate("/request-submit"),1000)
    } catch (err) {
      alert('Error requesting password reset');
    }
  }

  return (
<ThemeProvider theme={defaultTheme}>
<CssBaseline />
    <Box
        sx={{
          backgroundColor: '#fceae3', // Set the background color of the entire page
          minHeight: '100vh', //cover the full viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            bgcolor: 'white',
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(event)=>setUsername(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#022D5E" }}
            >
              Request Reset Password
            </Button>
          </Box>
        </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container> 
      </Box>
    
</ThemeProvider>
  )
}

export default PasswordResetRequest;