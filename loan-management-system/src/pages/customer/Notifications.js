import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Badge,
  Divider,
  Button,
  Alert,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Error,
  Warning,
  Info,
  MarkEmailRead,
  Delete,
  Visibility,
  Schedule,
  AccountBalance,
  Assignment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { getNotifications, markNotificationAsRead, getLoanApplications, formatApiError } from '../../api/customerApi';

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotifications();
      loadApplications();
    }
  }, [user]);

  // Set up polling for real-time updates
  useEffect(() => {
    if (!user) return;

    // Poll for updates every 30 seconds
    const intervalId = setInterval(() => {
      loadNotifications();
      loadApplications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [user]);

  // Refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        loadNotifications();
        loadApplications();
      }
    };

    const handleFocus = () => {
      if (user) {
        loadNotifications();
        loadApplications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      console.log('Loading notifications for user:', user?.email);
      const result = await getNotifications({
        userId: user?.id || user?.email
      });
      console.log('Notifications received:', result);
      setNotifications(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      const errorMessage = formatApiError(error);
      console.error('Formatted error:', errorMessage);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      console.log('Loading applications for user:', user?.email);
      
      // Check if credentials are stored
      const storedEmail = localStorage.getItem('basic_email');
      const storedPassword = localStorage.getItem('basic_password');
      console.log('Stored credentials:', { email: storedEmail, hasPassword: !!storedPassword });
      
      if (!storedEmail || !storedPassword) {
        console.error('No stored credentials found. User needs to login again.');
        setUserApplications([]);
        return;
      }
      
      const result = await getLoanApplications();
      console.log('Applications received:', result);
      console.log('Applications count:', Array.isArray(result) ? result.length : 0);
      
      // Check for status changes and mark them
      const newApplications = Array.isArray(result) ? result.map(app => {
        const existingApp = userApplications.find(existing => existing.id === app.id);
        return {
          ...app,
          statusChanged: existingApp && existingApp.status !== app.status,
          lastUpdated: existingApp && existingApp.status !== app.status ? new Date().toISOString() : existingApp?.lastUpdated
        };
      }) : [];
      
      setUserApplications(newApplications);
      
      // Clear status change indicators after 10 seconds
      setTimeout(() => {
        setUserApplications(prev => 
          prev.map(app => ({ ...app, statusChanged: false }))
        );
      }, 10000);
      
    } catch (error) {
      console.error('Failed to load applications:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      const errorMessage = formatApiError(error);
      console.error('Formatted error:', errorMessage);
      setUserApplications([]);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'error':
        return <Error sx={{ color: '#f44336' }} />;
      case 'warning':
        return <Warning sx={{ color: '#ff9800' }} />;
      default:
        return <Info sx={{ color: '#2196f3' }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      default:
        return '#2196f3';
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await markNotificationAsRead(notification.id);
        // Update local state
        setNotifications(prev => 
          prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
        );
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
    
    // Navigate to application if applicable
    if (notification.applicationId) {
      navigate('/customer/loan-status');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
      case 'SUBMITTED':
        return '#2196f3';
      case 'UNDER_REVIEW':
      case 'UNDER_MAKER_REVIEW':
      case 'UNDER_CHECKER_REVIEW':
        return '#ff9800';
      case 'APPROVED':
      case 'MAKER_APPROVED':
      case 'FINAL_APPROVED':
        return '#4caf50';
      case 'REJECTED':
      case 'MAKER_REJECTED':
      case 'FINAL_REJECTED':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
      case 'SUBMITTED':
        return 'Submitted';
      case 'UNDER_REVIEW':
      case 'UNDER_MAKER_REVIEW':
        return 'Under Review';
      case 'MAKER_APPROVED':
        return 'Approved by Officer';
      case 'MAKER_REJECTED':
        return 'Rejected by Officer';
      case 'UNDER_CHECKER_REVIEW':
        return 'Final Review';
      case 'APPROVED':
      case 'FINAL_APPROVED':
        return 'Approved';
      case 'REJECTED':
      case 'FINAL_REJECTED':
        return 'Rejected';
      default:
        return status || 'Unknown';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Add CSS animations for status changes
  const statusChangeStyles = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(33, 150, 243, 0.5); }
      50% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.8); }
    }
  `;

  // Inject styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = statusChangeStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const renderNotificationItem = (notification) => {
    const getIcon = () => {
      switch (notification.type) {
        case 'LOAN_APPROVED':
          return <CheckCircle color="success" />;
        case 'LOAN_REJECTED':
          return <Error color="error" />;
        case 'LOAN_PENDING':
          return <Schedule color="warning" />;
        default:
          return <Info color="info" />;
      }
    };

    const getColor = () => {
      switch (notification.type) {
        case 'LOAN_APPROVED':
          return 'success';
        case 'LOAN_REJECTED':
          return 'error';
        case 'LOAN_PENDING':
          return 'warning';
        default:
          return 'info';
      }
    };

    return (
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ListItem
          button
          onClick={() => handleNotificationClick(notification)}
          sx={{
            borderLeft: `4px solid`,
            borderLeftColor: `${getColor()}.main`,
            bgcolor: notification.read ? 'transparent' : 'action.hover',
            opacity: notification.read ? 0.7 : 1,
            '&:hover': {
              bgcolor: 'action.selected',
            },
          }}
        >
          <ListItemIcon>
            <Avatar sx={{ bgcolor: `${getColor()}.main`, width: 40, height: 40 }}>
              {getIcon()}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                  {notification.title}
                </Typography>
                {!notification.read && (
                  <Chip label="New" size="small" color="primary" />
                )}
              </Box>
            }
            secondary={
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(notification.createdAt)}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              onClick={async (e) => {
                e.stopPropagation();
                if (!notification.read) {
                  try {
                    await markNotificationAsRead(notification.id);
                    // Update local state
                    setNotifications(prev => 
                      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                    );
                  } catch (error) {
                    console.error('Failed to mark notification as read:', error);
                  }
                }
              }}
              disabled={notification.read}
              sx={{ opacity: notification.read ? 0.5 : 1 }}
            >
              <MarkEmailRead />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </motion.div>
    );
  };

  const renderNotifications = () => (
    <List>
      {notifications.length === 0 ? (
        <ListItem>
          <ListItemText
            primary="No notifications"
            secondary="You don't have any notifications yet."
          />
        </ListItem>
      ) : (
        notifications.map((notification, index) => (
          renderNotificationItem(notification)
        ))
      )}
    </List>
  );

  const renderApplicationStatus = () => {
    // Calculate statistics
    const totalApplications = userApplications.length;
    const pendingApplications = userApplications.filter(app => 
      ['PENDING', 'UNDER_REVIEW', 'MAKER_APPROVED'].includes(app.status)
    ).length;
    const approvedApplications = userApplications.filter(app => 
      ['APPROVED', 'FINAL_APPROVED'].includes(app.status)
    ).length;
    const rejectedApplications = userApplications.filter(app => 
      ['REJECTED', 'FINAL_REJECTED'].includes(app.status)
    ).length;

    return (
      <Box>
        {/* Applications List */}
        <Grid container spacing={3}>
          {userApplications.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">
                You haven't submitted any loan applications yet.{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/customer/apply-loan')}
                >
                  Apply Now
                </Button>
              </Alert>
            </Grid>
          ) : (
            userApplications.map((application, index) => (
          <Grid item xs={12} md={6} key={application.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Application #{application.id}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={getStatusLabel(application.status)}
                        sx={{
                          backgroundColor: getStatusColor(application.status),
                          color: 'white',
                          fontWeight: 'bold',
                          animation: application.statusChanged ? 'pulse 2s ease-in-out' : 'none',
                        }}
                      />
                      {application.statusChanged && (
                        <Chip
                          label="Updated"
                          size="small"
                          color="info"
                          sx={{ 
                            animation: 'glow 2s ease-in-out infinite',
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Loan Type:</strong> {application.loanType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Amount:</strong> ₹{application.loanAmount?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Duration:</strong> {application.loanTermMonths ? `${Math.round(application.loanTermMonths / 12)} years` : `${application.loanDuration} years`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Submitted:</strong> {new Date(application.applicationDate || application.submittedAt).toLocaleDateString()}
                  </Typography>
                  
                  {application.lastUpdated && (
                    <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                      <strong>Last Updated:</strong> {new Date(application.lastUpdated).toLocaleString()}
                    </Typography>
                  )}
                  
                  {application.cibilScore && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>CIBIL Score:</strong> {application.cibilScore}
                      </Typography>
                    </Box>
                  )}
                  
                  {application.makerComments && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <strong>Officer Comments:</strong> {application.makerComments}
                    </Alert>
                  )}
                  
                  {application.checkerComments && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <strong>Senior Officer Comments:</strong> {application.checkerComments}
                    </Alert>
                  )}
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Visibility />}
                    onClick={() => navigate('/customer/loan-status')}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
            ))
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #020b43 0%, #020b43 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2, width: 60, height: 60 }}>
              <NotificationsIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Notifications & Status
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Stay updated with your loan applications
              </Typography>
            </Box>
          </Box>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} unread notifications`}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          )}
        </Paper>

        {/* Tabs */}
        <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge badgeContent={unreadCount} color="error" />
                  )}
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalance />
                  Application Status
                </Box>
              }
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && renderNotifications()}
            {tabValue === 1 && renderApplicationStatus()}
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AccountBalance />}
                onClick={() => navigate('/customer/apply-loan')}
                sx={{ py: 1.5 }}
              >
                Apply for New Loan
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Schedule />}
                onClick={() => navigate('/customer/loan-status')}
                sx={{ py: 1.5 }}
              >
                Check Loan Status
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Notifications;