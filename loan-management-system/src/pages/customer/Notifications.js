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
    loadNotifications();
    loadApplications();

    // Poll for updates every 15 seconds
    const intervalId = setInterval(() => {
      loadNotifications();
      loadApplications();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [user.id]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const result = await getNotifications({
        userId: user?.id || user?.email
      });
      setNotifications(result || []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      const result = await getLoanApplications({
        userId: user?.id || user?.email
      });
      setUserApplications(result || []);
    } catch (error) {
      console.error('Failed to load applications:', error);
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
    switch (status) {
      case 'submitted':
        return '#2196f3';
      case 'maker_approved':
        return '#4caf50';
      case 'maker_rejected':
        return '#f44336';
      case 'final_approved':
        return '#4caf50';
      case 'final_rejected':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'under_maker_review':
        return 'Under Review';
      case 'maker_approved':
        return 'Approved by Officer';
      case 'maker_rejected':
        return 'Rejected by Officer';
      case 'under_checker_review':
        return 'Final Review';
      case 'final_approved':
        return 'Approved';
      case 'final_rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem
              button
              onClick={() => handleNotificationClick(notification)}
              sx={{
                backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                borderLeft: `4px solid ${getNotificationColor(notification.type)}`,
                mb: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              }}
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: notification.read ? 'normal' : 'bold',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <Badge color="primary" variant="dot" />
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
              {notification.applicationId && (
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <Visibility />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </motion.div>
        ))
      )}
    </List>
  );

  const renderApplicationStatus = () => (
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
                      {application.id}
                    </Typography>
                    <Chip
                      label={getStatusLabel(application.status)}
                      sx={{
                        backgroundColor: getStatusColor(application.status),
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Loan Type:</strong> {application.loanType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Amount:</strong> ₹{application.loanAmount?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Duration:</strong> {application.loanDuration} years
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}
                  </Typography>
                  
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
  );

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