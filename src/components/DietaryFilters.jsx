import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { useRecipes } from '../context/RecipeContext';

const dietaryOptions = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Gluten-Free', value: 'glutenFree' },
  { label: 'Dairy-Free', value: 'dairyFree' },
  { label: 'Nut-Free', value: 'nutFree' },
  { label: 'Low-Carb', value: 'lowCarb' },
  { label: 'Keto', value: 'keto' },
  { label: 'Paleo', value: 'paleo' }
];

const DietaryFilters = () => {
  const { dietaryFilters, toggleDietaryFilter, clearFilters } = useRecipes();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Dietary Restrictions
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {dietaryOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            onClick={() => toggleDietaryFilter(option.value)}
            color={dietaryFilters.includes(option.value) ? 'primary' : 'default'}
            sx={{ mb: 1 }}
          />
        ))}
        {dietaryFilters.length > 0 && (
          <Chip
            label="Clear All"
            onClick={clearFilters}
            variant="outlined"
            sx={{ mb: 1 }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default DietaryFilters; 