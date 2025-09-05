import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e2a5e 0%, #3d4a7a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Logo size="large" showText={true} />
            </Box>

            {/* 404 Error */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '6rem' },
                fontWeight: 'bold',
                color: '#1e2a5e',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: '#333',
                fontWeight: 'bold',
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: '#666',
                fontSize: '1.1rem',
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              Oops! The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1e2a5e 0%, #3d4a7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0f1a3e 0%, #1e2a5e 100%)',
                  },
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderColor: '#1e2a5e',
                  color: '#1e2a5e',
                  '&:hover': {
                    borderColor: '#0f1a3e',
                    backgroundColor: 'rgba(30, 42, 94, 0.04)',
                  },
                }}
              >
                Go Back
              </Button>
            </Box>

            {/* Help Text */}
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: '#888',
                fontSize: '0.9rem',
              }}
            >
              Need help? Contact our support team or visit our{' '}
              <Button
                variant="text"
                onClick={() => navigate('/contact')}
                sx={{
                  p: 0,
                  minWidth: 'auto',
                  textDecoration: 'underline',
                  fontSize: '0.9rem',
                }}
              >
                contact page
              </Button>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound;