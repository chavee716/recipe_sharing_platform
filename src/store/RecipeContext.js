import React, { createContext, useState, useEffect, useContext } from 'react';
import { getRecipes } from '../services/mockdata';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState([]);

  // Load recipes on mount
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        const recipesData = getRecipes();
        setRecipes(recipesData);
        setFilteredRecipes(recipesData);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, []);

  // Apply filters when recipes, searchTerm, or dietaryFilters change
  useEffect(() => {
    if (!recipes.length) return;
    
    let filtered = [...recipes];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(term) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(term))
      );
    }
    
    // Apply dietary filters
    if (dietaryFilters.length > 0) {
      filtered = filtered.filter(recipe => 
        dietaryFilters.every(filter => recipe.dietary.includes(filter))
      );
    }
    
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, dietaryFilters]);

  // Get a single recipe by ID
  const getRecipeById = (id) => {
    const numId = parseInt(id, 10);
    return recipes.find(recipe => recipe.id === numId) || null;
  };

  // Add a new recipe
  const addRecipe = (newRecipe) => {
    // Generate a new ID
    const id = Math.max(0, ...recipes.map(r => r.id)) + 1;
    
    const recipeWithId = {
      ...newRecipe,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 0 // Initial rating for new recipes
    };
    
    const updatedRecipes = [...recipes, recipeWithId];
    setRecipes(updatedRecipes);
    
    // Update localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    return recipeWithId;
  };

  // Update an existing recipe
  const updateRecipe = (id, updatedRecipe) => {
    const numId = parseInt(id, 10);
    const index = recipes.findIndex(recipe => recipe.id === numId);
    
    if (index !== -1) {
      const updatedRecipes = [...recipes];
      updatedRecipes[index] = {
        ...updatedRecipes[index],
        ...updatedRecipe,
        id: numId // Ensure ID remains the same
      };
      
      setRecipes(updatedRecipes);
      
      // Update localStorage
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      
      return updatedRecipes[index];
    }
    
    return null;
  };

  // Delete a recipe
  const deleteRecipe = (id) => {
    const numId = parseInt(id, 10);
    const updatedRecipes = recipes.filter(recipe => recipe.id !== numId);
    
    if (updatedRecipes.length !== recipes.length) {
      setRecipes(updatedRecipes);
      
      // Update localStorage
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      
      return true;
    }
    
    return false;
  };

  const value = {
    recipes,
    filteredRecipes,
    loading,
    searchTerm,
    setSearchTerm,
    dietaryFilters,
    setDietaryFilters,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

// Custom hook for using the recipe context
export const useRecipes = () => {
  return useContext(RecipeContext);
};

export default RecipeContext;