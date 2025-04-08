import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { createRecipe } = useRecipes();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cookingTime: 1,
    servings: 1,
    difficulty: '',
    dietaryRestrictions: [],
    image: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData?.ingredients?.some(ing => !ing?.trim())) {
      newErrors.ingredients = 'All ingredients must be filled';
    }
    if (formData?.instructions?.some(inst => !inst?.trim())) {
      newErrors.instructions = 'All instructions must be filled';
    }
    if (!formData?.cookingTime || formData.cookingTime <= 0) {
      newErrors.cookingTime = 'Cooking time must be greater than 0';
    }
    if (!formData?.servings || formData.servings <= 0) {
      newErrors.servings = 'Number of servings must be greater than 0';
    }
    if (!formData?.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }
    if (!formData?.image?.trim()) {
      newErrors.image = 'Please add a photo URL for your recipe';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields, including the image URL',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanedFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        instructions: formData.instructions.filter(inst => inst.trim() !== ''),
        userId: user?.id,
        creator: user?.username,
        creatorId: user?.id,
        servings: Math.max(1, parseInt(formData.servings)),
        cookingTime: Math.max(1, parseInt(formData.cookingTime))
      };
      
      await createRecipe(cleanedFormData);
      setSnackbar({
        open: true,
        message: 'Recipe created successfully!',
        severity: 'success'
      });
      setTimeout(() => navigate('/'), 1500);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? value : item
      )
    }));
    if (errors[arrayName]) {
      setErrors(prev => ({
        ...prev,
        [arrayName]: ''
      }));
    }
  };

  const handleAddItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };

  const handleRemoveItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Please log in to create a recipe
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Ingredients
                </Typography>
                {formData.ingredients.map((ingredient, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                      error={!!errors.ingredients}
                      required
                      disabled={isSubmitting}
                    />
                    <IconButton
                      onClick={() => handleRemoveItem('ingredients', index)}
                      color="error"
                      disabled={isSubmitting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                {errors.ingredients && (
                  <Typography color="error" variant="caption">
                    {errors.ingredients}
                  </Typography>
                )}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('ingredients')}
                  sx={{ mt: 1 }}
                  disabled={isSubmitting}
                >
                  Add Ingredient
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                {formData.instructions.map((instruction, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Step ${index + 1}`}
                      value={instruction}
                      onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                      multiline
                      rows={2}
                      error={!!errors.instructions}
                      required
                      disabled={isSubmitting}
                    />
                    <IconButton
                      onClick={() => handleRemoveItem('instructions', index)}
                      color="error"
                      disabled={isSubmitting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                {errors.instructions && (
                  <Typography color="error" variant="caption">
                    {errors.instructions}
                  </Typography>
                )}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('instructions')}
                  sx={{ mt: 1 }}
                  disabled={isSubmitting}
                >
                  Add Step
                </Button>
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
                  required
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
                  required
                  disabled={isSubmitting}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Difficulty"
                  name="difficulty"
                  select
                  value={formData.difficulty}
                  onChange={handleChange}
                  error={!!errors.difficulty}
                  helperText={errors.difficulty}
                  required
                  disabled={isSubmitting}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  error={!!errors.image}
                  helperText={errors.image || "Please add a photo URL for your recipe"}
                  placeholder="https://example.com/recipe-image.jpg"
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['vegan', 'vegetarian', 'gluten-free', 'dairy-free'].map((restriction) => (
                    <Chip
                      key={restriction}
                      label={restriction}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
                            ? prev.dietaryRestrictions.filter(r => r !== restriction)
                            : [...prev.dietaryRestrictions, restriction]
                        }));
                      }}
                      color={formData.dietaryRestrictions.includes(restriction) ? 'primary' : 'default'}
                      variant={formData.dietaryRestrictions.includes(restriction) ? 'filled' : 'outlined'}
                      disabled={isSubmitting}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Recipe'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>

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

export default CreateRecipe; 