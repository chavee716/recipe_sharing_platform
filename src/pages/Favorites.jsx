import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // TODO: Implement actual favorites fetching logic
        setFavorites([]);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>Your Favorites</h1>
        <p>You haven't favorited any recipes yet.</p>
        <Link to="/">Browse Recipes</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Favorites</h1>
      <div className="recipe-grid">
        {favorites.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorites; 