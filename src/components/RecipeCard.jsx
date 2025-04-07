import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
  Rating,
  Stack
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Timer,
  Share
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites?.includes(recipe.id);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    await toggleFavorite(recipe.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share functionality (could use Web Share API)
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe for ${recipe.title}!`,
        url: window.location.href,
      });
    }
  };

  return (
    <MotionCard
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        '&:hover': {
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
        },
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 1,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            {isFavorite ? (
              <Favorite sx={{ color: '#4CAF50' }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <IconButton
            onClick={handleShare}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <Share />
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 1,
            color: '#2E7D32',
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {recipe.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Timer sx={{ color: '#8D6E63', fontSize: 20 }} />
          <Typography variant="body2" color="#8D6E63">
            {recipe.cookingTime}
          </Typography>
          <Rating
            value={recipe.rating}
            readOnly
            size="small"
            sx={{
              ml: 'auto',
              '& .MuiRating-iconFilled': {
                color: '#4CAF50',
              },
            }}
          />
        </Stack>

        <Box sx={{ mt: 'auto' }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {recipe.dietary?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: '#E8F5E9',
                  color: '#2E7D32',
                  '&:hover': {
                    bgcolor: '#C8E6C9',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default RecipeCard;