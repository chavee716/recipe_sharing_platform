import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { ThemeProvider } from './context/ThemeContext';
import { useThemeMode } from './context/ThemeContext';
import getTheme from './theme';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';

const AppContent = () => {
  const { darkMode } = useThemeMode();
  const theme = getTheme(darkMode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RecipeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                
                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={<PrivateRoute><Profile /></PrivateRoute>}
                />
                <Route
                  path="/create-recipe"
                  element={<PrivateRoute><CreateRecipe /></PrivateRoute>}
                />
                <Route
                  path="/edit-recipe/:id"
                  element={<PrivateRoute><EditRecipe /></PrivateRoute>}
                />
                <Route
                  path="/favorites"
                  element={<PrivateRoute><Favorites /></PrivateRoute>}
                />
                <Route
                  path="/meal-planner"
                  element={<PrivateRoute><MealPlanner /></PrivateRoute>}
                />
                <Route
                  path="/shopping-list"
                  element={<PrivateRoute><ShoppingList /></PrivateRoute>}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </RecipeProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;