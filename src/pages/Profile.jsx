import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tab,
  Tabs,
  Avatar,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  RestaurantMenu as RestaurantMenuIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

const MotionPaper = motion(Paper);

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { recipes, loading: recipesLoading } = useRecipes();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const favoriteRecipes = recipes.filter(recipe => 
    user?.favorites?.includes(recipe.id)
  );

  const userRecipes = recipes.filter(recipe => 
    recipe.userId === user?.id || 
    recipe.creator === user?.id || 
    recipe.creatorId === user?.id
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData({
        username: user?.username || '',
        email: user?.email || ''
      });
    }
    setIsEditing(!isEditing);
    setUpdateError('');
    setUpdateSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateSuccess('');
    setIsSubmitting(true);

    try {
      await updateProfile({ username: profileData.username });
      setUpdateSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setUpdateError(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: '#4CAF50',
                  fontSize: '2.5rem',
                  margin: '0 auto 1rem'
                }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
              
              {!isEditing ? (
                <>
                  <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                    {user?.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEditToggle}
                    sx={{
                      mt: 2,
                      color: '#4CAF50',
                      '&:hover': { bgcolor: '#E8F5E9' }
                    }}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    margin="normal"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={user?.email}
                    disabled
                    margin="normal"
                    sx={{ mb: 2 }}
                  />
                  {updateError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {updateError}
                    </Alert>
                  )}
                  {updateSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {updateSuccess}
                    </Alert>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        bgcolor: '#4CAF50',
                        '&:hover': { bgcolor: '#2E7D32' }
                      }}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      onClick={handleEditToggle}
                      variant="outlined"
                      sx={{
                        color: '#4CAF50',
                        borderColor: '#4CAF50',
                        '&:hover': {
                          borderColor: '#2E7D32',
                          bgcolor: '#E8F5E9'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" sx={{ color: '#2E7D32', mb: 1 }}>
                Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: '#E8F5E9'
                    }}
                  >
                    <FavoriteIcon sx={{ color: '#4CAF50', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                      {favoriteRecipes.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Favorites
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: '#E8F5E9'
                    }}
                  >
                    <RestaurantMenuIcon sx={{ color: '#4CAF50', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                      {userRecipes.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recipes
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </MotionPaper>
        </Grid>

        {/* Recipes Section */}
        <Grid item xs={12} md={8}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              borderRadius: 2,
              bgcolor: 'background.paper',
              overflow: 'hidden'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: '#E8F5E9'
              }}
            >
              <Tab
                icon={<FavoriteIcon />}
                label="Favorites"
                sx={{
                  '&.Mui-selected': {
                    color: '#4CAF50'
                  }
                }}
              />
              <Tab
                icon={<RestaurantMenuIcon />}
                label="My Recipes"
                sx={{
                  '&.Mui-selected': {
                    color: '#4CAF50'
                  }
                }}
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {recipesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: '#4CAF50' }} />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {(activeTab === 0 ? favoriteRecipes : userRecipes).map((recipe) => (
                    <Grid item xs={12} sm={6} key={recipe.id}>
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  ))}
                  {(activeTab === 0 ? favoriteRecipes : userRecipes).length === 0 && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        align="center"
                        sx={{ py: 4 }}
                      >
                        {activeTab === 0
                          ? "You haven't saved any favorites yet."
                          : "You haven't created any recipes yet."}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {activeTab === 0 ? (
                          <Button
                            startIcon={<EditIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                              color: '#4CAF50',
                              '&:hover': { bgcolor: '#E8F5E9' }
                            }}
                          >
                            Explore Recipes
                          </Button>
                        ) : (
                          <Button
                            startIcon={<EditIcon />}
                            onClick={() => navigate('/create-recipe')}
                            sx={{
                              color: '#4CAF50',
                              '&:hover': { bgcolor: '#E8F5E9' }
                            }}
                          >
                            Create Recipe
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 