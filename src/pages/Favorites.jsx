import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Paper,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useThemeMode } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const { user } = useAuth();
  const { recipes, loading, error } = useRecipes();
  const navigate = useNavigate();
  const { darkMode } = useThemeMode();
  const theme = useTheme();

  const favoriteRecipes = recipes.filter(recipe => user?.favorites?.includes(recipe.id));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="h6">Loading favorites...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="h6" color="error">Error loading favorites: {error}</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: darkMode ? 'background.paper' : '#fff',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <FavoriteIcon
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
                mr: 2
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              My Favorite Recipes
            </Typography>
          </Box>

          {favoriteRecipes.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                You haven't added any recipes to your favorites yet
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Browse Recipes
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {favoriteRecipes.map((recipe) => (
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
          )}
        </Paper>
      </Container>
    </motion.div>
  );
};

export default Favorites; 