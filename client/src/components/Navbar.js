import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import CloseIcon from '@mui/icons-material/Close';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StoreIcon from '@mui/icons-material/Store';
import MailIcon from '@mui/icons-material/Mail';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LoginIcon from '@mui/icons-material/Login';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

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
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const pageList = [
    { title: "Home", link: "/" },
    { title: "Discover", link: "/discover" },
    { title: "Dashboard", link: "/dashboard" },
  ];

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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" sx={{ bgcolor: "primary.main", width: '100%' }}>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery-Wise
            </Typography>

            {pageList.map((page) => (
            <div key={page.title}>
              <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                variant="body1"
                  color="inherit"
                  style={{ margin: 8, display: { xs: 'none', sm: 'none', md: 'block' } }}
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
            <Typography variant="body1" color="inherit" onClick={toggleRightDrawer(true)}>Create Account</Typography>
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
              { text: 'Dashboard', icon: <PersonIcon/>, link: '/dashboard' },
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

        {/* <Main open={leftOpen || rightOpen}>
          <DrawerHeader />
        </Main> */}

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

      </Box>
    </div>
  );
}

export default Navbar;
