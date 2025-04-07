import React, { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
  Fade,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { 
  Search, 
  Restaurant, 
  ArrowDownward, 
  Favorite, 
  Share, 
  LocalFireDepartment,
  RestaurantMenu,
  Timer,
  TrendingUp
} from '@mui/icons-material';
import RecipeCard from '../components/RecipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import FilterButtons from '../components/FilterButtons';
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';

// Animated components using framer-motion
const MotionGrid = motion(Grid);
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { darkMode } = useThemeMode();
  const { recipes, loading, error, searchTerm, setSearchTerm } = useRecipes();
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getFilteredRecipes = () => {
    let filtered = [...recipes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => 
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'trending':
        filtered = filtered.filter(recipe => recipe.trending);
        break;
      case 'quick':
        filtered = filtered.filter(recipe => recipe.cookingTime <= 30);
        break;
      case 'popular':
        filtered = filtered.filter(recipe => recipe.rating >= 4);
        break;
      default:
        break;
    }

    return filtered;
  };

  if (error) {
    return (
      <Container>
        <MotionTypography 
          color="error" 
          align="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </MotionTypography>
      </Container>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section with Parallax */}
      <MotionBox
        sx={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3))',
            zIndex: 1
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          component="img"
          src="https://static.vecteezy.com/system/resources/previews/049/974/138/non_2x/top-view-of-vibrant-cultural-dishes-on-rustic-wooden-table-free-photo.jpg"
          alt="Delicious food"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <MotionBox
            sx={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              mx: 'auto',
              px: 2,
              backdropFilter: 'blur(4px)',
              borderRadius: 4,
              p: 4,
              background: 'rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MotionTypography
              variant={isMobile ? "h3" : "h1"}
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                color: 'white',
                letterSpacing: '0.5px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Flavor Exchange
            </MotionTypography>
            <MotionTypography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                color: '#E8F5E9'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore, share, and create amazing recipes from around the world
            </MotionTypography>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowDownward />}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#388E3C',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Recipes
              </Button>
            </MotionBox>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        bgcolor: darkMode ? 'background.default' : '#F1F8E9',
        transition: 'background-color 0.3s ease'
      }}>
        <Box sx={{ py: 4 }}>
          <SearchBar onSearch={handleSearch} />
          <FilterButtons 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange}
          />
          <RecipeGrid recipes={getFilteredRecipes()} />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;