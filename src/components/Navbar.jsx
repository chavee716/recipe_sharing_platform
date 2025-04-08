import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Favorite,
  AddCircleOutline,
  Person,
  Login,
  Logout,
  Restaurant,
  ShoppingCart,
  CalendarMonth,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { darkMode, toggleTheme } = useThemeMode();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setDrawerOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { text: 'My Recipes', icon: <Restaurant />, path: '/', requireAuth: false },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites', requireAuth: true },
    { text: 'Create Recipe', icon: <AddCircleOutline />, path: '/create-recipe', requireAuth: true },
    { text: 'Meal Planner', icon: <CalendarMonth />, path: '/meal-planner', requireAuth: true }
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100%' }}>
      <Box
        sx={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          bgcolor: '#4a5568',
          color: 'white',
        }}
      >
        <Typography variant="h6" component="div">
          Flavor Exchange
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {(!item.requireAuth || (item.requireAuth && user)) && (
              <ListItem
                button
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&:hover': {
                    bgcolor: '#E8F5E9',
                    '& .MuiListItemIcon-root': {
                      color: '#4CAF50',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#666' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <List>
        {!user ? (
          <>
            <ListItem
              button
              onClick={() => handleNavigation('/login')}
              sx={{
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  '& .MuiListItemIcon-root': {
                    color: '#4CAF50',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#666' }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation('/register')}
              sx={{
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  '& .MuiListItemIcon-root': {
                    color: '#4CAF50',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#666' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              onClick={() => handleNavigation('/profile')}
              sx={{
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  '& .MuiListItemIcon-root': {
                    color: '#4CAF50',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#666' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  '& .MuiListItemIcon-root': {
                    color: '#4CAF50',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#666' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: darkMode ? '#1E1E1E' : '#4a5568', zIndex: theme.zIndex.drawer + 1, borderRadius: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              color: 'white'
            }}
            onClick={() => navigate('/')}
          >
            <Restaurant sx={{ color: 'white' }} />
            Flavor Exchange
          </Typography>
          
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ 
              ml: 1,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            borderRadius: 0
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 