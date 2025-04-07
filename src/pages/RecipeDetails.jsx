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
  RestaurantMenu
} from '@mui/icons-material';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUserFavorites } = useAuth();
  const { recipes, deleteRecipe } = useRecipes();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const foundRecipe = recipes.find(r => r.id === parseInt(id, 10));
        if (!foundRecipe) {
          throw new Error('Recipe not found');
        }
        setRecipe(foundRecipe);
      } catch (err) {
        setError(err.message || 'Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipes]);
  
  // Check if recipe is in user's favorites
  const isFavorite = user && user.favorites && user.favorites.includes(parseInt(id, 10));
  
  // Check if user is the creator of this recipe
  const isCreator = recipe && user && recipe.creator === user.id;
  
  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      await updateUserFavorites(parseInt(id, 10), !isFavorite);
    } catch (err) {
      setError('Failed to update favorites');
      console.error(err);
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
      
      <Paper elevation={3} sx={{ overflow: 'hidden', mb: 4 }}>
        <Box 
          sx={{ 
            height: { xs: '200px', sm: '300px', md: '400px' },
            overflow: 'hidden', 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
              zIndex: 1
            }
          }}
        >
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: 'brightness(0.9)',
              transition: 'transform 0.3s ease-in-out'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: { xs: 2, sm: 3, md: 4 },
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              zIndex: 2
            }}
          >
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              {recipe.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ color: 'white', mr: 1 }} />
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {recipe.cookingTime} minutes
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ color: '#FFD700', mr: 1 }} />
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {recipe.rating?.toFixed(1) || '0.0'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {/* Favorite Button */}
            <IconButton
              onClick={handleFavoriteToggle}
              sx={{ 
                color: isFavorite ? '#4CAF50' : 'inherit',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <AccessTime color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">{recipe.cookingTime} minutes</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Star sx={{ color: '#FFD700', mr: 1 }} />
              <Typography variant="body2">{recipe.rating?.toFixed(1) || '0.0'}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: { xs: 1, sm: 0 } }}>
              {recipe.dietary && recipe.dietary.map(diet => (
                <Chip 
                  key={diet} 
                  label={diet} 
                  size="small" 
                  color={diet === 'vegan' ? 'success' : 'primary'} 
                />
              ))}
            </Box>
          </Box>
          
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
          
          <Divider sx={{ my: 3 }} />
          
          {/* Ingredients */}
          <Typography variant="h5" component="h2" gutterBottom>
            Ingredients
          </Typography>
          <List dense>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <RestaurantMenu sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Instructions */}
          <Typography variant="h5" component="h2" gutterBottom>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon>
                  <Chip 
                    label={index + 1} 
                    color="primary" 
                    size="small" 
                    sx={{ bgcolor: '#4CAF50' }}
                  />
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

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