// Mock data
const defaultRecipes = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce',
    ingredients: [
      '2 cups flour',
      '1 cup warm water',
      'Fresh mozzarella',
      'Fresh basil leaves',
      'Tomato sauce',
      'Olive oil',
      'Salt',
      'Active dry yeast'
    ],
    instructions: [
      'Mix flour, yeast, and salt in a bowl',
      'Add warm water and olive oil, knead into dough',
      'Let rise for 1 hour',
      'Roll out dough and add toppings',
      'Bake at 450°F for 12-15 minutes'
    ],
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    cookingTime: 30,
    servings: 4,
    rating: 4.5,
    reviews: [],
    createdAt: '2024-03-15T10:00:00Z',
    userId: 'user1',
    dietary: ['vegetarian'],
    trending: true
  },
  {
    id: '2',
    title: 'Creamy Garlic Pasta',
    description: 'A rich and creamy pasta dish with garlic and parmesan',
    ingredients: [
      '8 oz pasta',
      '4 tbsp butter',
      '4 cloves garlic, minced',
      '2 cups heavy cream',
      '1 cup grated parmesan',
      'Salt and pepper to taste',
      'Fresh parsley, chopped'
    ],
    instructions: [
      'Cook pasta according to package directions. Drain and set aside.',
      'In a large skillet, melt butter over medium heat.',
      'Add minced garlic and sauté for 1-2 minutes until fragrant.',
      'Pour in heavy cream and bring to a simmer.',
      'Reduce heat and stir in parmesan cheese until melted and smooth.',
      'Add the cooked pasta to the sauce and toss to coat evenly.',
      'Season with salt and pepper to taste.',
      'Garnish with chopped parsley before serving.'
    ],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: 25,
    servings: 4,
    rating: 4.8,
    reviews: [],
    createdAt: '2024-03-14T15:30:00Z',
    userId: 'user2',
    dietary: ['vegetarian'],
    trending: false
  },
  {
    id: '3',
    title: 'Classic Beef Burger',
    description: 'Juicy homemade beef burger with all the fixings',
    ingredients: [
      '1 lb ground beef',
      '1 egg',
      '1/4 cup breadcrumbs',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '1/2 tsp garlic powder',
      '4 burger buns',
      'Lettuce, tomato, onion for serving',
      'Cheese slices',
      'Ketchup and mustard'
    ],
    instructions: [
      'In a large bowl, mix ground beef, egg, breadcrumbs, salt, pepper, and garlic powder.',
      'Form into 4 equal-sized patties, making a slight indentation in the center of each.',
      'Heat a grill or skillet over medium-high heat.',
      'Cook patties for 4-5 minutes per side for medium doneness.',
      'Add cheese slices on top during the last minute of cooking.',
      'Toast burger buns lightly on the grill or in a toaster.',
      'Assemble burgers with lettuce, tomato, onion, and condiments.',
      'Serve immediately.'
    ],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: 20,
    servings: 4,
    rating: 4.9,
    reviews: [],
    createdAt: '2024-03-13T12:00:00Z',
    userId: 'user3',
    dietary: [],
    trending: true
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with default recipes if empty
const initializeStorage = () => {
  const stored = localStorage.getItem('recipes');
  if (!stored) {
    localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
  }
};

// Get recipes from localStorage
const getStoredRecipes = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('recipes')) || [];
};

// Save recipes to localStorage
const saveRecipes = (recipes) => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// API functions
export const api = {
  // Get all recipes
  getRecipes: async () => {
    await delay(500);
    return getStoredRecipes();
  },

  // Get a single recipe by ID
  getRecipe: async (id) => {
    await delay(300);
    const recipes = getStoredRecipes();
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return { ...recipe };
  },

  // Create a new recipe
  createRecipe: async (recipeData) => {
    await delay(500);
    const recipes = getStoredRecipes();
    const newRecipe = {
      ...recipeData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: [],
      // Set a default image if none provided
      image: recipeData.image || 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    };
    const updatedRecipes = [...recipes, newRecipe];
    saveRecipes(updatedRecipes);
    return newRecipe;
  },

  // Update a recipe
  updateRecipe: async (id, recipeData) => {
    await delay(500);
    const recipes = getStoredRecipes();
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    const updatedRecipe = {
      ...recipes[index],
      ...recipeData,
      id, // Ensure ID doesn't change
    };
    const updatedRecipes = recipes.map(r => r.id === id ? updatedRecipe : r);
    saveRecipes(updatedRecipes);
    return updatedRecipe;
  },

  // Delete a recipe
  deleteRecipe: async (id) => {
    await delay(500);
    const recipes = getStoredRecipes();
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    const updatedRecipes = recipes.filter(r => r.id !== id);
    saveRecipes(updatedRecipes);
    return true;
  },

  // Search recipes
  searchRecipes: async (query) => {
    await delay(300);
    const recipes = getStoredRecipes();
    const lowercaseQuery = query.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.description.toLowerCase().includes(lowercaseQuery) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Get favorite recipes
  getFavoriteRecipes: async () => {
    await delay(300);
    const user = auth.getCurrentUser();
    
    if (!user || !Array.isArray(user.favorites)) {
      console.log('No user or favorites found');
      return [];
    }
    
    const recipes = getStoredRecipes();
    console.log('All recipes:', recipes);
    console.log('User favorites:', user.favorites);
    
    const favoriteRecipes = recipes.filter(recipe => 
      user.favorites.includes(String(recipe.id))
    );
    
    console.log('Filtered favorite recipes:', favoriteRecipes);
    return favoriteRecipes;
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

  // Get all users from localStorage
  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  },

  // Save users to localStorage
  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Login
  login: async (credentials) => {
    await delay(500);
    const users = auth.getUsers();
    
    // Check if user exists in the users list
    if (users[credentials.email] && users[credentials.email].password === credentials.password) {
      localStorage.setItem('currentUser', JSON.stringify(users[credentials.email].user));
      return users[credentials.email].user;
    }
    
    // Check test users as fallback
    const testUsers = {
      "test@example.com": {
        password: "password123",
        user: {
          id: "test123",
          email: "test@example.com",
          username: "TestUser",
          favorites: ["1", "2"],
          profileImage: "https://i.pravatar.cc/150?img=1",
          bio: "I love cooking and trying new recipes!",
          createdAt: new Date().toISOString()
        }
      },
      "demo@example.com": {
        password: "demo123",
        user: {
          id: "demo123",
          email: "demo@example.com",
          username: "DemoUser",
          favorites: ["3"],
          profileImage: "https://i.pravatar.cc/150?img=2",
          bio: "Food enthusiast and recipe collector",
          createdAt: new Date().toISOString()
        }
      }
    };

    const testUser = testUsers[credentials.email];
    if (testUser && testUser.password === credentials.password) {
      localStorage.setItem('currentUser', JSON.stringify(testUser.user));
      return testUser.user;
    }

    throw new Error('Invalid credentials');
  },

  // Register
  register: async (userData) => {
    await delay(500);
    const users = auth.getUsers();
    
    // Check if email already exists
    if (users[userData.email]) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      username: userData.username,
      favorites: [],
      profileImage: "https://i.pravatar.cc/150?img=3",
      bio: "New recipe enthusiast",
      createdAt: new Date().toISOString()
    };

    // Add user to users list
    users[userData.email] = {
      password: userData.password,
      user: newUser
    };

    // Save updated users list
    auth.saveUsers(users);
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
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

  // Toggle favorite
  toggleFavorite: async (recipeId) => {
    await delay(300);
    const user = auth.getCurrentUser();
    if (!user) throw new Error('Must be logged in to favorite recipes');

    // Initialize favorites array if it doesn't exist
    const favorites = Array.isArray(user.favorites) ? user.favorites : [];
    
    // Convert recipeId to string for consistent comparison
    const recipeIdString = String(recipeId);
    
    // Check if recipe is already favorited
    const isFavorite = favorites.includes(recipeIdString);
    
    // Update favorites array
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== recipeIdString)
      : [...favorites, recipeIdString];
    
    // Update user object
    const updatedUser = {
      ...user,
      favorites: updatedFavorites
    };
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    console.log('Updated user favorites:', updatedUser.favorites);
    return updatedUser;
  }
}; 