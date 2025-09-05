import React from 'react';
import { Box, Toolbar } from '@mui/material';
import PublicNavigation from '../navigation/PublicNavigation';

const PublicLayout = ({ children }) => {
  return (
    <Box>
      <PublicNavigation />
      <Toolbar /> {/* This creates space for the fixed AppBar */}
      {children}
    </Box>
  );
};

export default PublicLayout;