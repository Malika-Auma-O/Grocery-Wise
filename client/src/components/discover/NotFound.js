import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Error from "../../images/giphy.gif";

function NotFound() {
    const navigate = useNavigate()

    function toHome() {
        navigate("/")
    }
  return (
    <Box
      sx={{
        backgroundImage: `url(${Error})`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'  
      }}
    >

      <Box 
        sx={{
          mt: "100px",
          ml: "100px",
          height: '100px',
          display: 'flex',
          alignItems: 'center', 
        //   justifyContent: 'center',
        }}
      >

        <Box sx={{textAlign: 'center'}}>

          <Typography variant="h1">404</Typography>
          <Typography variant="h2">Page Not Found</Typography>

          <Typography>
            Sorry, the page you were looking for does not exist.
          </Typography>  
          <br></br>
          <Button
          variant="contained"
          sx={{ bgcolor: '#022D5E' }}
          onClick={() => toHome()}
           >
            Go Back Home
          </Button>

        </Box>

      </Box>

    </Box>
  );
}

export default NotFound;