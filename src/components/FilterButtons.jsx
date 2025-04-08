import React from 'react';
import { Box, Button, Stack, useTheme } from '@mui/material';
import { useRecipes } from '../context/RecipeContext';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const theme = useTheme();
  const { dietaryFilters, toggleDietaryFilter } = useRecipes();

  const mainFilters = [
    { label: 'All Recipes', value: 'all' },
    { label: 'Trending', value: 'trending' },
    { label: 'Quick Meals', value: 'quick' },
    { label: 'Popular', value: 'popular' }
  ];

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

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {mainFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'contained' : 'outlined'}
            onClick={() => onFilterChange(filter.value)}
            sx={{
              mb: 1,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: activeFilter === filter.value 
                  ? theme.palette.primary.dark 
                  : theme.palette.primary.light,
                color: 'white'
              }
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
        {dietaryOptions.map((option) => (
          <Button
            key={option.value}
            variant={dietaryFilters.includes(option.value) ? 'contained' : 'outlined'}
            onClick={() => toggleDietaryFilter(option.value)}
            sx={{
              mb: 1,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: dietaryFilters.includes(option.value)
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.light,
                color: 'white'
              }
            }}
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterButtons; 