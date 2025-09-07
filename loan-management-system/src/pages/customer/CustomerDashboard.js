import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Assignment,
  Notifications as NotificationsIcon,
  AccountBalance,
  ArrowForward,
  TrendingUp,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { getDashboardData, formatApiError } from '../../api/customerApi';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalLoans: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    unreadNotifications: 0,
    recentLoans: [],
    totalApprovedAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  // Check if we need to refresh dashboard after navigation
  useEffect(() => {
    if (location.state?.refreshDashboard) {
      loadDashboardData();
      // Clear the state to prevent repeated refreshes
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Refresh dashboard when component becomes visible (e.g., after navigation)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadDashboardData();
      }
    };

    const handleFocus = () => {
      loadDashboardData();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const result = await getDashboardData();
      console.log('Dashboard data received:', result); // Debug log
      setDashboardData(result || {
        totalLoans: 0,
        pendingLoans: 0,
        approvedLoans: 0,
        unreadNotifications: 0,
        recentLoans: [],
        totalApprovedAmount: 0
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh function for external use
  window.refreshDashboard = loadDashboardData;

  const menuOptions = [
    {
      title: 'Apply for Loan',
      description: 'Start a new loan application with our simple step-by-step process',
      icon: <Assignment sx={{ fontSize: 60, color: '#020b43' }} />,
      path: '/customer/apply-loan',
      color: '#020b43',
      bgColor: '#e8f4fd',
    },
    {
      title: 'Notifications',
      description: 'View updates and status changes for your loan applications',
      icon: <NotificationsIcon sx={{ fontSize: 60, color: '#020b43' }} />,
      path: '/customer/notifications',
      color: '#020b43',
      bgColor: '#e8f5e8',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #020b43 0%, #020b43 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                width: 80,
                height: 80,
                fontSize: '2rem',
                mr: 3,
              }}
            >
              {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome, {user?.firstName || user?.name || 'Customer'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Ready to apply for your loan? Let's get started.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            {/* <AccountBalance sx={{ mr: 2, fontSize: 30 }} /> */}
            {/* <Typography variant="h5">
              Your trusted financial partner
            </Typography> */}
          </Box>
        </Paper>
      </motion.div>

      {/* Dashboard Statistics */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <TrendingUp sx={{ fontSize: 40, color: '#20b43', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#020b43' }}>
                    {dashboardData.totalLoans}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Applications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Schedule sx={{ fontSize: 40, color: '#020b43', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#020b43' }}>
                    {dashboardData.pendingLoans}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Review
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <CheckCircle sx={{ fontSize: 40, color: '#020b43', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#020b43' }}>
                    {dashboardData.approvedLoans}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Approved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <NotificationsIcon sx={{ fontSize: 40, color: '#020b43', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#020b43' }}>
                    {dashboardData.unreadNotifications || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notifications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      )}

      {loading && (
        <Box sx={{ mb: 4 }}>
          <LinearProgress />
        </Box>
      )}

      {/* Main Menu Options */}
      <Grid container spacing={4} alignItems="stretch">
        {menuOptions.map((option, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ height: '100%' }}
            >
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => navigate(option.path)}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      backgroundColor: option.bgColor,
                      borderRadius: '50%',
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {option.icon}
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: option.color,
                    }}
                  >
                    {option.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {option.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: option.color,
                      fontWeight: 'bold',
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      mt: 'auto',
                      '&:hover': {
                        backgroundColor: option.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>


    </Container>
  );
};

export default CustomerDashboard;