import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BG_IMAGE = "https://av.sc.com/corp-en/nr/content/images/SC-head-office-2022-scaled.jpg";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) setError('Invalid or missing token');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Invalid or missing token');
      return;
    }
    if (!password || !confirm) {
      setError('Please enter and confirm your new password');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { resetPasswordApi } = await import('../api/authApi');
      await resetPasswordApi({ token, newPassword: password });
      setSuccess('Password reset successful. You can now login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: { xs: 'center', md: 'flex-end' }, backgroundImage: `url('${BG_IMAGE}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', p: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
        <Paper elevation={12} sx={{ borderRadius: 3, overflow: 'hidden', background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255, 255, 255, 0.2)', width: { xs: '100%', sm: 420, md: 420 }, maxWidth: '100%' }}>
          <Box sx={{ background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)', color: 'white', p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Reset Password</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>Enter your new password</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField fullWidth label="New Password" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} InputProps={{ startAdornment: (<InputAdornment position="start"><Lock color="action" /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass(!showPass)} edge="end">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />

            <TextField fullWidth label="Confirm Password" type={showConfirm ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} sx={{ mb: 3 }} InputProps={{ startAdornment: (<InputAdornment position="start"><Lock color="action" /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">{showConfirm ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />

            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.25, fontWeight: 'bold', background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)', '&:hover': { background: 'linear-gradient(135deg, #0473ea 0%, #0473ea 100%)' } }}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
          </Box>

          <Box sx={{ p: 2, backgroundColor: 'grey.50', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">© 2025 Standard Chartered Bank. All rights reserved.</Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;