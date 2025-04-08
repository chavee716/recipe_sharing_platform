import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';

const CookingTimer = ({ initialTime }) => {
  const { darkMode } = useThemeMode();
  const [timeLeft, setTimeLeft] = useState(initialTime * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsComplete(true);
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsComplete(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(initialTime * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: darkMode ? 'background.paper' : '#fff',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 1 }}>
        Cooking Timer
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{
          color: isComplete ? '#f44336' : darkMode ? '#fff' : '#000',
          fontWeight: 'bold',
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {!isRunning ? (
          <IconButton
            onClick={handleStart}
            color="primary"
            disabled={isComplete}
            sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)' }}
          >
            <PlayArrow />
          </IconButton>
        ) : (
          <IconButton
            onClick={handlePause}
            color="primary"
            sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)' }}
          >
            <Pause />
          </IconButton>
        )}
        <IconButton
          onClick={handleReset}
          color="primary"
          sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)' }}
        >
          <Replay />
        </IconButton>
      </Box>
      {isComplete && (
        <Typography
          variant="body1"
          color="error"
          sx={{ mt: 1, fontWeight: 'bold' }}
        >
          Time's up! ⏰
        </Typography>
      )}
    </Paper>
  );
};

export default CookingTimer; 