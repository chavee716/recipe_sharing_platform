import { getRecipes } from './mockdata';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all recipes
export const fetchAllRecipes = async () => {
  try {
    await delay(800); // Simulate network delay
    const recipes = getRecipes();
    return { success: true, data: recipes };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { success: false, error: 'Failed to fetch recipes' };
  }
};

// Get a single recipe by ID
export const fetchRecipeById = async (id) => {
  try {
    await delay(500); // Simulate network delay
    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id === parseInt(id, 10));
    
    if (!recipe) {
      return { success: false, error: 'Recipe not found' };
    }
    
    return { success: true, data: recipe };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return { success: false, error: 'Failed to fetch recipe' };
  }
};

// Create a new recipe
export const createRecipe = async (recipeData, userId) => {
  try {
    await delay(1000); // Simulate network delay
    const recipes = getRecipes();
    
    // Generate a new ID
    const id = Math.max(0, ...recipes.map(r => r.id)) + 1;
    
    const newRecipe = {
      ...recipeData,
      id,
      createdBy: userId,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 0 // Initial rating for new recipes
    };
    
    const updatedRecipes = [...recipes, newRecipe];
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    return { success: true, data: newRecipe };
  } catch (error) {
    console.error('Error creating recipe:', error);
    return { success: false, error: 'Failed to create recipe' };
  }
};

// Update an existing recipe
export const updateRecipe = async (id, recipeData, userId) => {
  try {
    await delay(1000); // Simulate network delay
    const recipes = getRecipes();
    const recipeIndex = recipes.findIndex(r => r.id === parseInt(id, 10));
    
    if (recipeIndex === -1) {
      return { success: false, error: 'Recipe not found' };
    }
    
    // Check if user is the creator of the recipe
    if (recipes[recipeIndex].createdBy !== userId) {
      return { success: false, error: 'You can only edit your own recipes' };
    }
    
    const updatedRecipe = {
      ...recipes[recipeIndex],
      ...recipeData,
      id: parseInt(id, 10) // Ensure ID remains the same
    };
    
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex] = updatedRecipe;
    
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    return { success: true, data: updatedRecipe };
  } catch (error) {
    console.error('Error updating recipe:', error);
    return { success: false, error: 'Failed to update recipe' };
  }
};

// Delete a recipe
export const deleteRecipe = async (id, userId) => {
  try {
    await delay(800); // Simulate network delay
    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id === parseInt(id, 10));
    
    if (!recipe) {
      return { success: false, error: 'Recipe not found' };
    }
    
    // Check if user is the creator of the recipe
    if (recipe.createdBy !== userId) {
      return { success: false, error: 'You can only delete your own recipes' };
    }
    
    const updatedRecipes = recipes.filter(r => r.id !== parseInt(id, 10));
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { success: false, error: 'Failed to delete recipe' };
  }
};

// Search recipes by term
export const searchRecipes = async (searchTerm) => {
  try {
    await delay(500); // Simulate network delay
    const recipes = getRecipes();
    
    if (!searchTerm) {
      return { success: true, data: recipes };
    }
    
    const term = searchTerm.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(term))
    );
    
    return { success: true, data: filteredRecipes };
  } catch (error) {
    console.error('Error searching recipes:', error);
    return { success: false, error: 'Failed to search recipes' };
  }
};

// Filter recipes by dietary restrictions
export const filterRecipesByDietary = async (dietaryFilters) => {
  try {
    await delay(500); // Simulate network delay
    const recipes = getRecipes();
    
    if (!dietaryFilters || dietaryFilters.length === 0) {
      return { success: true, data: recipes };
    }
    
    const filteredRecipes = recipes.filter(recipe => 
      dietaryFilters.every(filter => recipe.dietary.includes(filter))
    );
    
    return { success: true, data: filteredRecipes };
  } catch (error) {
    console.error('Error filtering recipes:', error);
    return { success: false, error: 'Failed to filter recipes' };
  }
};