import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { Email, ArrowBack, Send } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

const BG_IMAGE = "https://av.sc.com/corp-en/nr/content/images/SC-head-office-2022-scaled.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your registered email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const { forgotPasswordApi } = await import('../api/authApi');
      await forgotPasswordApi(email);
      setSuccess('If an account exists for this email, a password reset link has been sent.');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: { xs: 'center', md: 'flex-end' },
        backgroundImage: `url('${BG_IMAGE}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
        <Paper
          elevation={12}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: { xs: '100%', sm: 420, md: 420 },
            maxWidth: '100%',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)',
              color: 'white',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Forgot Password</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Enter your email to receive a reset link
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={<Send />}
              sx={{
                py: 1.25,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)',
                },
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Button
              fullWidth
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/login')}
              sx={{ mt: 1.5, color: '#0473ea', textTransform: 'none', fontWeight: 'bold' }}
            >
              Back to Login
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ p: 2, backgroundColor: 'grey.50', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © 2025 Standard Chartered Bank. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;