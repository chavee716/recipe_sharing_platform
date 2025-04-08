import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRecipeForm } from '../utils/validation';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Stack,
  Grid,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const CreateRecipe = () => {
  const { darkMode } = useThemeMode();
  const { createRecipe } = useRecipes();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    image: '',
    cookingTime: 1,
    servings: 1,
    difficulty: 'medium',
    cuisine: '',
    dietary: []
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate servings and cooking time
    if (formData.servings <= 0) {
      setErrors(prev => ({ ...prev, servings: 'Servings must be greater than 0' }));
      return;
    }
    
    if (formData.cookingTime <= 0) {
      setErrors(prev => ({ ...prev, cookingTime: 'Cooking time must be greater than 0' }));
      return;
    }

    const { isValid, errors: validationErrors } = validateRecipeForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      setErrors(null);
      
      const cleanedFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        userId: user.id,
        creator: user.username,
        creatorId: user.id,
        servings: Math.max(1, parseInt(formData.servings)),
        cookingTime: Math.max(1, parseInt(formData.cookingTime))
      };
      
      await createRecipe(cleanedFormData);
      setSnackbar({
        open: true,
        message: 'Recipe created successfully!',
        severity: 'success'
      });
      setTimeout(() => navigate('/'), 1500); // Navigate after showing success message
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to create recipe',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Recipe
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Recipe Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cooking Time (minutes)"
                  name="cookingTime"
                  type="number"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  error={!!errors.cookingTime}
                  helperText={errors.cookingTime}
                  disabled={isSubmitting}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Servings"
                  name="servings"
                  type="number"
                  value={formData.servings}
                  onChange={handleChange}
                  error={!!errors.servings}
                  helperText={errors.servings}
                  disabled={isSubmitting}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Ingredients
                </Typography>
                <Stack spacing={2}>
                  {formData.ingredients.map((ingredient, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        label={`Ingredient ${index + 1}`}
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        error={!!errors.ingredients}
                        helperText={index === 0 ? errors.ingredients : ''}
                        disabled={isSubmitting}
                      />
                      <IconButton 
                        onClick={() => removeIngredient(index)}
                        disabled={formData.ingredients.length === 1 || isSubmitting}
                        color="error"
                        sx={{ flexShrink: 0 }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={addIngredient}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                    disabled={isSubmitting}
                  >
                    Add Ingredient
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  error={!!errors.instructions}
                  helperText={errors.instructions}
                  multiline
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter the URL of your recipe image"
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{ minWidth: 120 }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Recipe'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default CreateRecipe; 