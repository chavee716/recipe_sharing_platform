import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';
import RecipeCard from './RecipeCard';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RecipeGrid = ({ recipes }) => {
  const { darkMode } = useThemeMode();

  if (!recipes.length) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <RestaurantIcon sx={{ 
          fontSize: 60, 
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          mb: 2 
        }} />
        <Typography 
          variant="h5" 
          sx={{ 
            color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)',
            mb: 1
          }}
        >
          No recipes found
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
          }}
        >
          Try adjusting your search or check back later for new recipes
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeGrid; 