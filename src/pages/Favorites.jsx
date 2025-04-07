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

const Favorites = () => {
  const { user } = useAuth();
  const { recipes, loading, error } = useRecipes();
  const navigate = useNavigate();
  const { darkMode } = useThemeMode();
  const theme = useTheme();

  const favoriteRecipes = recipes.filter(recipe => user?.favorites?.includes(recipe.id));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image}
                    alt={recipe.title}
                    sx={{
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Favorites; 