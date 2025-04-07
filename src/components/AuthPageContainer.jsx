import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';

const AuthPageContainer = ({ children }) => {
  const { darkMode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://qcexclusive.com/wp-content/uploads/2024/03/IMZM1759-e1713370484888.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: darkMode ? 'brightness(0.4)' : 'brightness(0.7)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: darkMode ? 'rgba(26, 31, 44, 0.85)' : 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode ? 'rgba(36, 42, 56, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            border: '1px solid',
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPageContainer; 