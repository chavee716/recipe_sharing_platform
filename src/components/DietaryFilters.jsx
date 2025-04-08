import React from 'react';
import { Box, Chip, Typography, Stack } from '@mui/material';
import { useRecipes } from '../context/RecipeContext';

const dietaryOptions = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Gluten-Free', value: 'gluten-free' },
  { label: 'Dairy-Free', value: 'dairy-free' },
  { label: 'Nut-Free', value: 'nut-free' },
  { label: 'Low-Carb', value: 'low-carb' },
  { label: 'Keto', value: 'keto' },
  { label: 'Paleo', value: 'paleo' }
];

const DietaryFilters = () => {
  const { dietaryFilters, toggleDietaryFilter, clearFilters } = useRecipes();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Dietary Filters
        </Typography>
        {dietaryFilters.length > 0 && (
          <Chip
            label="Clear All"
            onClick={clearFilters}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {dietaryOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            onClick={() => toggleDietaryFilter(option.value)}
            color={dietaryFilters.includes(option.value) ? 'primary' : 'default'}
            variant={dietaryFilters.includes(option.value) ? 'filled' : 'outlined'}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default DietaryFilters; 