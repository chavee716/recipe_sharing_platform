import { API_ENDPOINTS } from '../utils/constants';

const recipeService = {
  async getAllRecipes() {
    try {
      const response = await fetch(API_ENDPOINTS.RECIPES);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  async getRecipeById(id) {
    try {
      const response = await fetch(`${API_ENDPOINTS.RECIPES}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  },

  async createRecipe(recipeData) {
    try {
      const response = await fetch(API_ENDPOINTS.RECIPES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  async updateRecipe(id, recipeData) {
    try {
      const response = await fetch(`${API_ENDPOINTS.RECIPES}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  async deleteRecipe(id) {
    try {
      const response = await fetch(`${API_ENDPOINTS.RECIPES}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },
};

export default recipeService; 