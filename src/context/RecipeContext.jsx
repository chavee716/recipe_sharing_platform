import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState([]);

  // Fetch all recipes on mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes when search term or dietary filters change
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, dietaryFilters, recipes]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await api.getRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = async () => {
    try {
      setLoading(true);
      let filtered = [...recipes];

      // Apply search term filter
      if (searchTerm) {
        filtered = await api.searchRecipes(searchTerm);
      }

      // Apply dietary restrictions filter
      if (dietaryFilters.length > 0) {
        filtered = await api.filterRecipes(dietaryFilters);
      }

      setFilteredRecipes(filtered);
    } catch (err) {
      console.error('Error filtering recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createRecipe = async (recipeData) => {
    try {
      setLoading(true);
      const newRecipe = await api.createRecipe(recipeData);
      setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      return newRecipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      setLoading(true);
      const updatedRecipe = await api.updateRecipe(id, recipeData);
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe.id === id ? updatedRecipe : recipe
        )
      );
      return updatedRecipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      setLoading(true);
      await api.deleteRecipe(id);
      setRecipes(prevRecipes =>
        prevRecipes.filter(recipe => recipe.id !== id)
      );
    } catch (err) {
      throw new Error(err.message || 'Failed to delete recipe');
    } finally {
      setLoading(false);
    }
  };

  const getRecipe = async (id) => {
    try {
      setLoading(true);
      const recipe = await api.getRecipe(id);
      return recipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch recipe');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    recipes,
    filteredRecipes,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    dietaryFilters,
    setDietaryFilters,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    fetchRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}; 