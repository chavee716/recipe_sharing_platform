import React from 'react';
import { Box, Button } from '@mui/material';
import { useThemeMode } from '../context/ThemeContext';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const { darkMode } = useThemeMode();

  const filters = [
    { id: 'all', label: 'All Recipes', icon: <RestaurantIcon /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUpIcon /> },
    { id: 'quick', label: 'Quick Meals', icon: <TimerIcon /> },
    { id: 'popular', label: 'Popular', icon: <FavoriteIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1, p: 2, overflowX: 'auto' }}>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          startIcon={filter.icon}
          onClick={() => onFilterChange(filter.id)}
          variant={activeFilter === filter.id ? 'contained' : 'outlined'}
          sx={{
            minWidth: 'fit-content',
            backgroundColor: activeFilter === filter.id 
              ? 'primary.main'
              : 'transparent',
            color: activeFilter === filter.id
              ? '#fff'
              : darkMode 
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.87)',
            borderColor: darkMode 
              ? 'rgba(255, 255, 255, 0.23)' 
              : 'rgba(0, 0, 0, 0.23)',
            '&:hover': {
              backgroundColor: activeFilter === filter.id
                ? 'primary.dark'
                : darkMode
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.08)',
              borderColor: darkMode
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          {filter.label}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons; 