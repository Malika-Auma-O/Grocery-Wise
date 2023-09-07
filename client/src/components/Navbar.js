import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Box, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StoreIcon from '@mui/icons-material/Store';
import MailIcon from '@mui/icons-material/Mail';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import logo from "../images/logo.jpg";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Navbar() {
  const navigate = useNavigate();
  const [decoded, setDecoded] = useState(null);
  const token = localStorage.getItem("token");
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const toggleLeftDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setLeftOpen(open);
  };
  const toggleRightDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setRightOpen(open);
  };

  
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setDecoded(decodedToken);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [token, navigate]);

  function handleLogout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    toggleRightDrawer(false);
    navigate("/login")
  }

  // const isAdmin = localStorage.getItem('isAdmin') === 'true';


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />        
        <AppBar position="static" sx={{ bgcolor: "#071828", width: '100%' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open left drawer"
              onClick={toggleLeftDrawer(true)}
              edge="start"
              sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <CardMedia
          component="img"
          src={logo}
          alt='free'
          sx={{ width: "40px", mr: "10px"}}
          />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery-Wise
            </Typography>

            {[
              { title: "Home", link: "/" },
              { title: "Discover", link: "/discover" },
              { title: "About", link: "/about" },
            ].map((page) => (
            <div key={page.title}>
              <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                variant="body1"
                  color="inherit"
                  sx={{ 
                    margin: { xs: 0, sm: 0, md: 2 },
                    display: { xs: 'none', sm: 'none', md: 'block' }
                  }}
                >
                  {page.title}
                </Typography>
              </Link>
            </div>
      ))}

            <IconButton
              color="inherit"
              aria-label="open right drawer"
              onClick={toggleRightDrawer(true)}
              edge="end"
              sx={{ mr: 2, ...(rightOpen && { display: 'none' }) }}
            >
              <PersonIcon />
            </IconButton>
            <Typography 
            sx={{cursor: "pointer"}}
            variant="body1" color="inherit" onClick={toggleRightDrawer(true)}>
              {decoded && decoded.username ? decoded.username.split('@')[0] : "Create Account"}
            </Typography>

          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="temporary"
          anchor="left"
          open={leftOpen}
          onClose={toggleLeftDrawer(false)} 
        >
          <DrawerHeader>
            <IconButton onClick={toggleLeftDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Home', icon: <StoreIcon/>, link: '/' },
              { text: 'About', icon: <PersonIcon/>, link: '/about' },
              { text: 'Discover', icon: <LocalGroceryStoreIcon  />, link: '/discover' },
              { text: 'Recipes', icon: <RestaurantIcon />, link: '/recipe' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={toggleLeftDrawer(false)} component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          
        </Drawer>
        {token ? 
        ( 
          <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="temporary"
          anchor="right"
          open={rightOpen}
          onClose={toggleRightDrawer(false)}
        >
          <DrawerHeader>
            <IconButton onClick={toggleRightDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              // { text: isAdmin ? "" : 'Profile', icon: isAdmin ? "" : <PersonIcon />, link: isAdmin ? "" : '/profile' },
              { text: 'My Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
              // { text: isAdmin ? 'Admin Dashboard' : 'My Dashboard', icon: <DashboardIcon />, link: isAdmin ? '/admin-dashboard' : '/dashboard' },
              { text: 'Add Product', icon: <DescriptionIcon />, link: '/products-form' },
              { text: 'Contact Us', icon: <MailIcon />, link: '/contact' },
              { text: 'FAQ', icon: <HelpCenterIcon />, link: '/faq' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={toggleRightDrawer(false)} component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
              onClick={ () =>{
                handleLogout();
                toggleLeftDrawer(false);
              }}
              >
              <LogoutIcon/>
              <ListItemText sx={{ m: 3 }}>
                Logout  
              </ListItemText>
              </ListItemButton>              
            </ListItem>
          </List>
        </Drawer>

        ) : (

          <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="temporary"
          anchor="right"
          open={rightOpen}
          onClose={toggleRightDrawer(false)}
        >
          <DrawerHeader>
            <IconButton onClick={toggleRightDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Login', icon: <LoginIcon />, link: '/login' },
              { text: 'Signup', icon: <PersonIcon />, link: '/signup' },
              { text: 'Contact Us', icon: <MailIcon />, link: '/contact' },
              { text: 'FAQ', icon: <HelpCenterIcon />, link: '/faq' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={toggleRightDrawer(false)} component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        )}
        

      </Box>
    </div>
  );
}

export default Navbar;
