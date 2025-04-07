import { createTheme } from '@mui/material/styles';

const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#4CAF50', // Vibrant green
      light: '#81C784', // Light green
      dark: '#2E7D32', // Dark green
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8D6E63', // Warm brown
      light: '#A1887F', // Light brown
      dark: '#6D4C41', // Dark brown
      contrastText: '#FFFFFF',
    },
    background: {
      default: darkMode ? '#1a1f2c' : '#f8f9fa',
      paper: darkMode ? '#242a38' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#E4E6EB' : '#2D3748',
      secondary: darkMode ? '#B0B3B8' : '#718096',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#F57C00',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
    divider: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.12)',
  },
  TextField: {
    styleOverrides: {
      root: {
        color: darkMode ? '#FFFFFF' : '#000000',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#2E7D32', // Dark green
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#5D4037', // Brown
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#2E7D32', // Dark green
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: darkMode ? '#FFFFFF' : '#000000',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#2E7D32', // Dark green
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#5D4037', // Brown
    },
    body1: {
      fontSize: '1rem',
      color: '#2E7D32', // Dark green
    },
    body2: {
      fontSize: '0.875rem',
      color: '#5D4037', // Brown
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)',
          backgroundColor: darkMode ? '#2d3546' : '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#242a38' : '#4a5568',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: darkMode ? '#242a38' : '#ffffff',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 16px',
        },
        paper: {
          backgroundColor: darkMode ? '#242a38' : '#ffffff',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default getTheme; 