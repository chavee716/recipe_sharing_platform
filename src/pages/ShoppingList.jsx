import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Alert
} from '@mui/material';
import { ShoppingCart, Construction } from '@mui/icons-material';

const ShoppingList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ShoppingCart sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Shopping List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Organize your grocery shopping with smart lists and recipe integration
          </Typography>
        </Box>

        <Alert 
          severity="info" 
          icon={<Construction />}
          sx={{ 
            mb: 4,
            '& .MuiAlert-icon': {
              color: '#4CAF50'
            }
          }}
        >
          The Shopping List feature is coming soon! We're working hard to bring you a seamless shopping experience.
        </Alert>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: '#E8F5E9',
                height: '100%'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                Recipe Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automatically add ingredients from your favorite recipes to your shopping list
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: '#E8F5E9',
                height: '100%'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                Smart Categories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Items automatically organized by category for efficient shopping
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: '#E8F5E9',
                height: '100%'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                Share & Collaborate
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share your shopping lists with family members and collaborate in real-time
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            disabled
            sx={{
              bgcolor: '#4CAF50',
              '&:hover': {
                bgcolor: '#2E7D32'
              }
            }}
          >
            Create Shopping List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShoppingList; 