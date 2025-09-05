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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from '@mui/material';
import {
  Assignment,
  TrendingUp,
  Schedule,
  CheckCircle,
  Cancel,
  Visibility,
  AccountBalance,
  People,
  Assessment,
  VerifiedUser,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';

const CheckerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getApplications, getNotifications, markAllNotificationsRead, APPLICATION_STATUS } = useLoan();
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReview: 0,
    approved: 0,
    rejected: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load applications for checker
    const result = await getApplications({ role: 'checker' });
    if (result.success) {
      const applications = result.applications;
      
      // Calculate stats
      setStats({
        totalApplications: applications.length,
        pendingReview: applications.filter(app => 
          [APPLICATION_STATUS.MAKER_APPROVED, APPLICATION_STATUS.UNDER_CHECKER_REVIEW].includes(app.status)
        ).length,
        approved: applications.filter(app => app.status === APPLICATION_STATUS.FINAL_APPROVED).length,
        rejected: applications.filter(app => app.status === APPLICATION_STATUS.FINAL_REJECTED).length,
      });
      
      // Get recent applications (last 5)
      setRecentApplications(applications.slice(0, 5));
    }
    
    // Load notifications
    const userNotifications = getNotifications(user.id, user.role);
    setNotifications(userNotifications.slice(0, 5));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return '#2196f3';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return '#ff9800';
      case APPLICATION_STATUS.FINAL_APPROVED:
        return '#4caf50';
      case APPLICATION_STATUS.FINAL_REJECTED:
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Ready for Review';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.FINAL_APPROVED:
        return 'Approved';
      case APPLICATION_STATUS.FINAL_REJECTED:
        return 'Rejected';
      default:
        return status;
    }
  };

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: <Assignment sx={{ fontSize: 40, color: '#1976d2' }} />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Pending Review',
      value: stats.pendingReview,
      icon: <Schedule sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#ff9800',
      bgColor: '#fff3e0',
    },
    {
      title: 'Final Approved',
      value: stats.approved,
      icon: <CheckCircle sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#4caf50',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Final Rejected',
      value: stats.rejected,
      icon: <Cancel sx={{ fontSize: 40, color: '#f44336' }} />,
      color: '#f44336',
      bgColor: '#ffebee',
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
              {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'C'}
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome, {user?.firstName || user?.name || 'Checker'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Senior Officer Dashboard - Final review and approval authority
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <VerifiedUser sx={{ mr: 2, fontSize: 30 }} />
            <Typography variant="h5">
              Final Approval Authority
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* Stats Cards - Exact Reference Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {statCards.map((stat, index) => (
            <Card
              key={index}
              elevation={0}
              onClick={() => {
                if (stat.title === 'Pending Review') {
                  navigate(`/checker/applications?status=${APPLICATION_STATUS.MAKER_APPROVED}`);
                } else if (stat.title === 'Final Approved') {
                  navigate(`/checker/applications?status=${APPLICATION_STATUS.FINAL_APPROVED}`);
                } else if (stat.title === 'Final Rejected') {
                  navigate(`/checker/applications?status=${APPLICATION_STATUS.FINAL_REJECTED}`);
                } else {
                  navigate('/checker/applications');
                }
              }}
              sx={{
                flex: 1,
                borderRadius: 2,
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                '&:hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }
              }}
            >
              <Box
                sx={{
                  backgroundColor: stat.bgColor,
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                {React.cloneElement(stat.icon, {
                  sx: { 
                    fontSize: 24, 
                    color: stat.color 
                  }
                })}
              </Box>

              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: stat.color, 
                  mb: 0.5,
                  fontSize: '2rem',
                  lineHeight: 1
                }}
              >
                {stat.value}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: '#666',
                  textAlign: 'center'
                }}
              >
                {stat.title}
              </Typography>
            </Card>
          ))}
        </Box>
      </motion.div>




      {/* Bottom Section - Aligned with Cards */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Recent Applications */}
        <Card elevation={1} sx={{ flex: 1, borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Recent Applications
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/checker/applications')}
                sx={{ fontSize: '0.75rem' }}
              >
                View All →
              </Button>
            </Box>
            
            {recentApplications.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3, fontSize: '0.875rem' }}>
                No applications to review
              </Typography>
            ) : (
              <Box>
                {recentApplications.slice(0, 3).map((application, index) => (
                  <Box key={application.id} sx={{ py: 1, borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                      {application.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {application.firstName} {application.lastName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card elevation={1} sx={{ flex: 1, borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/checker/applications')}
                sx={{ 
                  py: 1,
                  fontSize: '0.875rem',
                  textTransform: 'none'
                }}
              >
                View Applications
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/checker/applications')}
                sx={{ 
                  py: 1,
                  fontSize: '0.875rem',
                  textTransform: 'none'
                }}
              >
                View Reports
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card elevation={1} sx={{ flex: 1, borderRadius: 2, height: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Recent Notifications
              </Typography>
              <Button size="small" onClick={() => markAllNotificationsRead(user.id, user.role)}>
                Mark all as read
              </Button>
            </Box>
            {notifications.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3, fontSize: '0.875rem' }}>
                No new notifications
              </Typography>
            ) : (
              <Box>
                {notifications.slice(0, 3).map((notification, index) => (
                  <Box key={notification.id} sx={{ py: 1, borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.message.substring(0, 40)}...
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CheckerDashboard;