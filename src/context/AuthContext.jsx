import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await auth.login(credentials);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const user = await auth.register(userData);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = (onLogoutComplete) => {
    setIsLoggingOut(true);
    // Clear user data immediately
    setUser(null);
    localStorage.removeItem('user');
    
    // Add a small delay for the animation
    setTimeout(() => {
      setIsLoggingOut(false);
      if (onLogoutComplete) {
        onLogoutComplete();
      }
    }, 150);
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = await auth.updateUser(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (recipeId) => {
    try {
      setLoading(true);
      const updatedUser = await auth.toggleFavorite(recipeId);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    toggleFavorite,
    isAuthenticated: !!user,
    isLoggingOut
  };

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </AuthContext.Provider>
  );
}; 