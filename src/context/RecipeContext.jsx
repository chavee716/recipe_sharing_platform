import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [recipeCache, setRecipeCache] = useState({});

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
    let filtered = [...recipes];

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply dietary restrictions filter
    if (dietaryFilters.length > 0) {
      filtered = filtered.filter(recipe =>
        recipe.dietary && dietaryFilters.every(filter => recipe.dietary.includes(filter))
      );
    }

    setFilteredRecipes(filtered);
  };

  const getRecipe = useCallback(async (id) => {
    // Check cache first
    if (recipeCache[id]) {
      return recipeCache[id];
    }

    try {
      const recipe = await api.getRecipe(id);
      // Update cache
      setRecipeCache(prev => ({
        ...prev,
        [id]: recipe
      }));
      return recipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch recipe');
    }
  }, [recipeCache]);

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await api.createRecipe(recipeData);
      setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      return newRecipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to create recipe');
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      const updatedRecipe = await api.updateRecipe(id, recipeData);
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe.id === id ? updatedRecipe : recipe
        )
      );
      // Update cache
      setRecipeCache(prev => ({
        ...prev,
        [id]: updatedRecipe
      }));
      return updatedRecipe;
    } catch (err) {
      throw new Error(err.message || 'Failed to update recipe');
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await api.deleteRecipe(id);
      setRecipes(prevRecipes =>
        prevRecipes.filter(recipe => recipe.id !== id)
      );
      // Remove from cache
      setRecipeCache(prev => {
        const newCache = { ...prev };
        delete newCache[id];
        return newCache;
      });
    } catch (err) {
      throw new Error(err.message || 'Failed to delete recipe');
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