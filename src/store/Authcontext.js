import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUsers } from '../services/mockdata';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Handle login
  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  // Handle signup
  const signup = (username, email, password) => {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already in use' };
    }
    
    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      username,
      email,
      password,
      favorites: []
    };
    
    // Add to users array and update localStorage
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Log in the new user
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setCurrentUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  // Handle logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Update user favorites
  const updateUserFavorites = (recipeId, isFavorite) => {
    if (!currentUser) return;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      let updatedFavorites;
      
      if (isFavorite) {
        // Add to favorites if not already there
        updatedFavorites = [...new Set([...currentUser.favorites, recipeId])];
      } else {
        // Remove from favorites
        updatedFavorites = currentUser.favorites.filter(id => id !== recipeId);
      }
      
      // Update current user state
      const updatedUser = {
        ...currentUser,
        favorites: updatedFavorites
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in users array
      users[userIndex] = {
        ...users[userIndex],
        favorites: updatedFavorites
      };
      
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUserFavorites
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;