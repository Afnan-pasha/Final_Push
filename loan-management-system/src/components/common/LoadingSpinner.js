import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  open = false, 
  message = 'Loading...', 
  size = 60,
  variant = 'backdrop' // 'backdrop', 'inline', 'overlay'
}) => {
  const spinnerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <CircularProgress 
          size={size} 
          thickness={4}
          sx={{
            color: '#1e2a5e',
          }}
        />
      </motion.div>
      
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: variant === 'backdrop' ? 'white' : '#666',
            fontWeight: 'medium',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (variant === 'backdrop') {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
        open={open}
      >
        {spinnerContent}
      </Backdrop>
    );
  }

  if (variant === 'overlay') {
    return open ? (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(2px)',
          zIndex: 10,
        }}
      >
        {spinnerContent}
      </Box>
    ) : null;
  }

  // Inline variant
  return open ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      {spinnerContent}
    </Box>
  ) : null;
};

export default LoadingSpinner;