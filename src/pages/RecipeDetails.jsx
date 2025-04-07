import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  AccessTime,
  Star,
  Favorite,
  FavoriteBorder,
  Edit,
  Delete,
  ArrowBack,
  CheckCircleOutline,
  RestaurantMenu,
  Share
} from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useThemeMode();
  const { user, updateUserFavorites, toggleFavorite } = useAuth();
  const { recipes, deleteRecipe, getRecipe } = useRecipes();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipe(id);
        setRecipe(data);
        // Check if recipe is in user's favorites
        if (user && user.favorites) {
          setIsFavorite(user.favorites.includes(id));
        }
      } catch (err) {
        setError(err.message || 'Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }

    return () => {
      // Cleanup function
      setRecipe(null);
      setError(null);
    };
  }, [id, user, getRecipe]);
  
  // Update isFavorite when user changes
  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.includes(id));
    } else {
      setIsFavorite(false);
    }
  }, [user, id]);
  
  // Check if user is the creator of this recipe
  const isCreator = recipe && user && recipe.creator === user.id;
  
  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };
  
  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!user || !isCreator) return;
    
    try {
      await deleteRecipe(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete recipe');
      console.error(err);
    }
    
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress sx={{ color: '#4CAF50' }} />
      </Box>
    );
  }
  
  if (error || !recipe) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Recipe not found'}</Alert>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Recipes
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to Recipes
      </Button>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          bgcolor: darkMode ? 'background.paper' : '#fff',
          borderRadius: 2
        }}
      >
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12}>
            <Box
              component="img"
              src={recipe.image}
              alt={recipe.title}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Title and Actions Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {recipe.title}
              </Typography>
              <Box>
                <IconButton onClick={handleFavoriteClick} color="primary">
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={handleShare} color="primary">
                  <Share />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Recipe Info Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Chip
                icon={<AccessTime />}
                label={`${recipe.cookingTime} mins`}
                variant="outlined"
              />
              <Chip
                icon={<RestaurantMenu />}
                label={`${recipe.servings} servings`}
                variant="outlined"
              />
            </Box>
            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>
          </Grid>

          {/* Ingredients Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Instructions Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body1" paragraph>
              {recipe.instructions}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Creator Actions */}
      {isCreator && (
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{
              color: '#4CAF50',
              borderColor: '#4CAF50',
              '&:hover': {
                borderColor: '#2E7D32',
                bgcolor: '#E8F5E9'
              }
            }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecipeDetails;