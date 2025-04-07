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
import { CalendarMonth, Construction } from '@mui/icons-material';

const MealPlanner = () => {
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
          <CalendarMonth sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Meal Planner
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Plan your meals for the week and generate shopping lists automatically
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
          The Meal Planner feature is coming soon! We're working hard to bring you an amazing meal planning experience.
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
                Weekly Planning
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organize your meals for the entire week with our intuitive calendar interface
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
                Smart Shopping Lists
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automatically generate shopping lists based on your meal plan
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
                Nutritional Insights
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track nutritional information and maintain a balanced diet
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
            Start Planning
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default MealPlanner; 