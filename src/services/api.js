// Mock data
let recipes = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'Traditional Italian pizza with fresh ingredients',
    ingredients: [
      '2 cups flour',
      '1 cup water',
      'Fresh mozzarella',
      'Fresh basil',
      'Tomato sauce'
    ],
    instructions: 'Mix dough, let rise, top with ingredients, bake at 450°F',
    image: 'https://example.com/pizza.jpg',
    cookingTime: 30,
    servings: 4,
    rating: 4.5,
    reviews: [],
    createdAt: '2024-03-15T10:00:00Z',
    userId: 'user1',
    trending: true
  },
  {
    id: '2',
    title: 'Vegan Buddha Bowl',
    description: 'Healthy and colorful bowl packed with nutrients',
    ingredients: [
      'Quinoa',
      'Chickpeas',
      'Avocado',
      'Sweet potato',
      'Kale'
    ],
    instructions: 'Cook quinoa, roast vegetables, assemble bowl',
    image: 'https://example.com/buddha-bowl.jpg',
    cookingTime: 25,
    servings: 2,
    rating: 4.8,
    reviews: [],
    createdAt: '2024-03-14T15:30:00Z',
    userId: 'user2',
    trending: false
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get recipes from localStorage or use mock data
const getStoredRecipes = () => {
  const stored = localStorage.getItem('recipes');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('recipes', JSON.stringify(recipes));
  return recipes;
};

// Save recipes to localStorage
const saveRecipes = (recipes) => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// API functions
export const api = {
  // Get all recipes
  getRecipes: async () => {
    await delay(500); // Simulate network delay
    return [...recipes];
  },

  // Get a single recipe by ID
  getRecipe: async (id) => {
    await delay(300);
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return { ...recipe };
  },

  // Create a new recipe
  createRecipe: async (recipeData) => {
    await delay(500);
    const newRecipe = {
      ...recipeData,
      id: String(Date.now()), // Generate a unique ID
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: [],
    };
    recipes = [...recipes, newRecipe];
    saveRecipes(recipes);
    return newRecipe;
  },

  // Update a recipe
  updateRecipe: async (id, recipeData) => {
    await delay(500);
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    const updatedRecipe = {
      ...recipes[index],
      ...recipeData,
      id, // Ensure ID doesn't change
    };
    recipes = recipes.map(r => r.id === id ? updatedRecipe : r);
    saveRecipes(recipes);
    return updatedRecipe;
  },

  // Delete a recipe
  deleteRecipe: async (id) => {
    await delay(500);
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    recipes = recipes.filter(r => r.id !== id);
    saveRecipes(recipes);
    return true;
  },

  // Search recipes
  searchRecipes: async (query) => {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Filter recipes by dietary restrictions
  filterRecipes: async (restrictions) => {
    await delay(300);
    const recipes = getStoredRecipes();
    if (!restrictions || restrictions.length === 0) return recipes;
    return recipes.filter(recipe => 
      restrictions.every(restriction => 
        recipe.dietary && recipe.dietary.includes(restriction)
      )
    );
  }
};

// Auth related functions
export const auth = {
  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Login
  login: async (credentials) => {
    await delay(500);
    // Mock validation
    if (credentials.email === "test@example.com" && credentials.password === "password") {
      const user = {
        id: "user123",
        email: credentials.email,
        username: "TestUser",
        favorites: []
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },

  // Register
  register: async (userData) => {
    await delay(500);
    // Mock registration
    const user = {
      id: Date.now().toString(),
      email: userData.email,
      username: userData.username,
      favorites: []
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  // Logout
  logout: async () => {
    await delay(300);
    localStorage.removeItem('currentUser');
  },

  // Update user
  updateUser: async (userData) => {
    await delay(500);
    const currentUser = auth.getCurrentUser();
    if (!currentUser) throw new Error('No user logged in');
    
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return updatedUser;
  },

  // Toggle favorite recipe
  toggleFavorite: async (recipeId) => {
    await delay(300);
    const currentUser = auth.getCurrentUser();
    if (!currentUser) throw new Error('No user logged in');

    const favorites = currentUser.favorites || [];
    const isFavorite = favorites.includes(recipeId);
    
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    const updatedUser = { ...currentUser, favorites: updatedFavorites };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return updatedUser;
  }
}; 