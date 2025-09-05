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
  Schedule,
  CheckCircle,
  Cancel,
  Visibility,
  AccountBalance,
  Assessment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';

const MakerDashboard = () => {
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
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const result = await getApplications({ role: 'maker' });
    if (result.success) {
      const applications = result.applications;
      setStats({
        totalApplications: applications.length,
        pendingReview: applications.filter(app =>
          [APPLICATION_STATUS.SUBMITTED, APPLICATION_STATUS.UNDER_MAKER_REVIEW].includes(app.status)
        ).length,
        approved: applications.filter(app => app.status === APPLICATION_STATUS.MAKER_APPROVED).length,
        rejected: applications.filter(app => app.status === APPLICATION_STATUS.MAKER_REJECTED).length,
      });
      setRecentApplications(applications.slice(0, 5));
    }
    const userNotifications = getNotifications(user.id, user.role);
    setNotifications(userNotifications.slice(0, 5));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case APPLICATION_STATUS.SUBMITTED:
        return '#2196f3';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return '#ff9800';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return '#4caf50';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case APPLICATION_STATUS.SUBMITTED:
        return 'New';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved';
      case APPLICATION_STATUS.MAKER_REJECTED:
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
      title: 'Approved',
      value: stats.approved,
      icon: <CheckCircle sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#4caf50',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Rejected',
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
            background: 'linear-gradient(135deg,  #020b43 100%)',
            color: 'white',
            borderRadius: 3
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
              {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'M'}
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome, {user?.firstName || user?.name || 'Maker'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Loan Officer Dashboard - Review and process loan applications
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <AccountBalance sx={{ mr: 2, fontSize: 30 }} />
            <Typography variant="h5">
              Standard Chartered Banking
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      {/* Stats Cards */}
      <Box sx={{ mb: 4 }}>
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            width: '100%'
          }}
        >
          {statCards.map((stat, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 calc(25% - 18px)',
                minWidth: '250px',
                maxWidth: 'calc(25% - 18px)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{ 
                  width: '100%', 
                  height: '100%'
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: stat.bgColor,
                        borderRadius: '50%',
                        width: 70,
                        height: 70,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: stat.color,
                        mb: 1,
                        fontSize: '2rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.95rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
        {/* Recent Applications */}
        <Box sx={{ flex: '1 1 50%' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Recent Applications
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/maker/applications')}
                    endIcon={<Visibility />}
                  >
                    View All
                  </Button>
                </Box>
                {recentApplications.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No applications to review
                  </Typography>
                ) : (
                  <List>
                    {recentApplications.map((application, index) => (
                      <React.Fragment key={application.id}>
                        <ListItem
                          button
                          onClick={() => navigate(`/maker/review/${application.id}`)}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Assignment color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                  {application.id}
                                </Typography>
                                <Chip
                                  label={getStatusLabel(application.status)}
                                  size="small"
                                  sx={{
                                    backgroundColor: getStatusColor(application.status),
                                    color: 'white',
                                    fontWeight: 'bold',
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {application.firstName} {application.lastName} - {application.loanType} Loan
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Amount: ₹{application.loanAmount?.toLocaleString()} |
                                  CIBIL: {application.cibilScore}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < recentApplications.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ flex: '1 1 25%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Assignment />}
                    onClick={() => navigate('/maker/applications')}
                    sx={{ py: 1.5 }}
                  >
                    Review Applications
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assessment />}
                    onClick={() => navigate('/maker/applications')}
                    sx={{ py: 1.5 }}
                  >
                    View Reports
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Recent Notifications */}
        <Box sx={{ flex: '1 1 25%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Recent Notifications
                  </Typography>
                  <Button size="small" disabled={unreadCount === 0} onClick={() => {
                    markAllNotificationsRead(user.id, user.role);
                    // Refresh local list
                    const updated = getNotifications(user.id, user.role);
                    setNotifications(updated.slice(0, 5));
                  }}>
                    Mark all as read
                  </Button>
                </Box>
                {notifications.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No new notifications
                  </Typography>
                ) : (
                  <List dense>
                    {notifications.map((notification, index) => (
                      <ListItem key={notification.id} sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {notification.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {notification.message.substring(0, 50)}...
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default MakerDashboard;