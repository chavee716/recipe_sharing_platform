import React from 'react';
import { Box, Container, Typography, IconButton, Paper, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Navbar from './Navbar';
import { useThemeMode } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const theme = useTheme();
  const { darkMode, toggleTheme } = useThemeMode();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px',
          minHeight: '100vh',
          bgcolor: 'background.default',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>

      {/* About Us Section */}
      <Paper
        component="footer"
        square
        elevation={3}
        sx={{
          mt: 'auto',
          bgcolor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#4a5568',
          color: 'white',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Typography variant="h6" gutterBottom>
                About Flavor Exchange
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                Flavor Exchange is a vibrant community-driven platform where food enthusiasts come together to share, discover, and celebrate culinary creativity. Our mission is to make cooking more accessible, enjoyable, and social.
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Whether you're a seasoned chef or just starting your cooking journey, Flavor Exchange provides the tools and inspiration you need to explore new recipes, plan your meals, and connect with fellow food lovers.
              </Typography>
            </Box>

            <Box sx={{ flex: '0 1 200px' }}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  <li>Recipe Sharing</li>
                  <li>Meal Planning</li>
                  <li>Shopping Lists</li>
                  <li>Community Interaction</li>
                  <li>Personalized Collections</li>
                </ul>
              </Typography>
            </Box>

            <Box sx={{ flex: '0 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  {darkMode ? 'Dark' : 'Light'} Mode
                </Typography>
                <IconButton 
                  onClick={toggleTheme} 
                  color="inherit"
                  sx={{ 
                    ml: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © {new Date().getFullYear()} Flavor Exchange. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Layout; 