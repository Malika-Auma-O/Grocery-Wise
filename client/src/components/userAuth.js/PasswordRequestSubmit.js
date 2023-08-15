import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

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

function PasswordRequestSubmit() {
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Email sent!
            </Typography>
            <br></br>
            <Box>
              <Typography
                variant="body1"
                sx={{ mt: 1 }}
              >
                We have sent a password reset link to your email address. Please check both inbox and junk email.
              </Typography>
            </Box>
            <br></br>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/login"
                  variant="body2"
                >
                  Back to Login
                </Link>
              </Grid>

              <Grid item>
                <Link href="/contact" variant="body2">
                  {"Didn't receive an email? Contact Us"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PasswordRequestSubmit;
