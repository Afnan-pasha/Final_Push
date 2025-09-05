import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Email,
  Phone,
  Work,
  Security,
  Verified,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    designation: (user?.designation || user?.role || 'customer').toLowerCase(),
    department: user?.department || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(formData);
    
    if (result.success) {
      alert('Profile updated successfully');
      setEditing(false);
    } else {
      alert(result.error || 'Failed to update profile');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      designation: user?.designation || '',
      department: user?.department || '',
    });
    setEditing(false);
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      alert('Password changed successfully');
      setPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } else {
      alert(result.error || 'Failed to change password');
    }
    setLoading(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'customer':
        return 'primary';
      case 'maker':
        return 'info';
      case 'checker':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'customer':
        return <Person />;
      case 'maker':
        return <Edit />;
      case 'checker':
        return <Verified />;
      default:
        return <Person />;
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Profile
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #1e2a5e 0%, #3d4a7a 100%)',
                color: 'white',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: '2rem',
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.3)',
                      },
                    }}
                    size="small"
                  >
                    <PhotoCamera fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {user?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Chip
                      label={user?.role?.toUpperCase()}
                      color={getRoleColor(user?.role)}
                      icon={getRoleIcon(user?.role)}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />

                  </Box>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {user?.email}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    startIcon={editing ? <Save /> : <Edit />}
                    onClick={editing ? handleSave : () => setEditing(true)}
                    disabled={loading}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      },
                      mb: 1,
                    }}
                  >
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                  {editing && (
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                        ml: 1,
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} /> Personal Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* Designation shows current role (read-only) */}
                    <TextField
                      fullWidth
                      label="Designation"
                      value={(user?.role || '').charAt(0).toUpperCase() + (user?.role || '').slice(1)}
                      disabled
                      InputProps={{
                        startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>

                </Grid>

                {editing && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Security & Settings */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 1 }} /> Security
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Password
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    ••••••••••••
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setPasswordDialog(true)}
                  >
                    Change Password
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Account Status
                  </Typography>
                  <Chip
                    label="Active"
                    color="success"
                    icon={<Verified />}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Last Login
                  </Typography>
                  <Typography variant="body2">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    User ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {user?.id}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>


        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={passwordDialog}
        onClose={() => setPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Change Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Password must be at least 6 characters long.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPasswordDialog(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordSubmit}
            disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;