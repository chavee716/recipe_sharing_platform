import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

const RecipeList = () => {
  const { recipes, searchTerm, dietaryFilters } = useRecipes();

  const filteredRecipes = recipes.filter(recipe => {
    // Apply search term filter
    const matchesSearch = !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));

    // Apply dietary filters
    const matchesDietary = dietaryFilters.length === 0 || 
      dietaryFilters.every(filter => recipe.dietaryRestrictions?.includes(filter));

    return matchesSearch && matchesDietary;
  });

  if (filteredRecipes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No recipes found. Try adjusting your search or filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="recipes-section">
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeList; 