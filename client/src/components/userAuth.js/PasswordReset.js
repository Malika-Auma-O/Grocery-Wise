import { useState } from 'react';
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
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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

function PasswordReset({ match }) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");


  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
        token,
        newPassword  
      });

      if (response.status === 200) {
        alert('Password reset successful!');
      navigate("/login")
      }

      console.error('Password reset failed');
    } catch (err) {
      alert('Error resetting password');
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
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
            Enter New Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter new password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              value={newPassword}
              onChange={(event)=>setNewPassword(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#022D5E" }}
            >
              Reset Password
            </Button>
          </Box>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>

//    <form onSubmit={handleSubmit}>
//      <TextField
//        label="New Password"
//        type="password"
//        value={password}
//        onChange={e => setPassword(e.target.value)} 
//      />

//      <Button type="submit">Reset Password</Button>
//    </form>
  )
}

export default PasswordReset;