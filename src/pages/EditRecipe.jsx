import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const EditRecipe = () => {
  const { darkMode } = useThemeMode();
  const { updateRecipe, getRecipe } = useRecipes();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    image: '',
    cookingTime: '',
    servings: '',
    difficulty: 'medium',
    cuisine: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipe = await getRecipe(id);
        if (recipe.creator !== user?.id && recipe.creatorId !== user?.id && recipe.userId !== user?.id) {
          navigate('/');
          return;
        }
        setFormData({
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: Array.isArray(recipe.instructions) 
            ? recipe.instructions 
            : recipe.instructions ? [recipe.instructions] : [''],
          image: recipe.image,
          cookingTime: recipe.cookingTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty || 'medium',
          cuisine: recipe.cuisine || '',
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to load recipe',
          severity: 'error'
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, getRecipe, user, navigate]);

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

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      setFormData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateRecipeForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Filter out empty ingredients and instructions
      const cleanedFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        instructions: formData.instructions.filter(inst => inst.trim() !== ''),
      };

      await updateRecipe(id, cleanedFormData);
      setSnackbar({
        open: true,
        message: 'Recipe updated successfully!',
        severity: 'success'
      });
      setTimeout(() => navigate(`/recipe/${id}`), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to update recipe',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress sx={{ color: '#4CAF50' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          bgcolor: darkMode ? 'background.paper' : '#fff',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Edit Recipe
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  label="Difficulty"
                  disabled={isSubmitting}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                disabled={isSubmitting}
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
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Stack spacing={2}>
                {formData.instructions.map((instruction, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      label={`Step ${index + 1}`}
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      error={!!errors.instructions}
                      helperText={index === 0 ? errors.instructions : ''}
                      multiline
                      rows={2}
                      disabled={isSubmitting}
                    />
                    <IconButton 
                      onClick={() => removeInstruction(index)}
                      disabled={formData.instructions.length === 1 || isSubmitting}
                      color="error"
                      sx={{ flexShrink: 0 }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addInstruction}
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                  disabled={isSubmitting}
                >
                  Add Step
                </Button>
              </Stack>
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
                  onClick={() => navigate(`/recipe/${id}`)}
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
                    'Update Recipe'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

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
    </Container>
  );
};

export default EditRecipe; 