import React from 'react';
import { Box } from '@mui/material';
import appLogo from '../assets/images/standard-chartered-logo.png';

// Centralized logo component for the app
// Uses the Standard Chartered brand logo placed at src/assets/images/standard-chartered-logo.png
const Logo = ({ size = 'medium' }) => {
  const logoSizes = {
    small: { height: 40 },
    medium: { height: 56 },
    large: { height: 72 }
  };

  const currentSize = logoSizes[size] || logoSizes.medium;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Display the app logo with responsive height while preserving aspect ratio */}
      <img
        src={appLogo}
        alt="App Logo"
        style={{
          height: currentSize.height,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </Box>
  );
};

export default Logo;