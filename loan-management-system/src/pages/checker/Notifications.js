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
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Error,
  Warning,
  Info,
  MarkEmailRead,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';

const CheckerNotifications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getNotifications, markNotificationRead, markAllNotificationsRead } = useLoan();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const checkerNotifications = getNotifications(user.id, 'checker');
    setNotifications(checkerNotifications);
  }, [user.id]);

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

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationRead(notification.id);
      setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
    }
    // Checkers should go to the specific review when possible
    if (notification.applicationId) {
      navigate(`/checker/review/${notification.applicationId}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NotificationsIcon color="primary" />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
            <Chip label={`${unreadCount} Unread`} color={unreadCount ? 'primary' : 'default'} size="small" />
          </Box>
          <Button
            variant="outlined"
            size="small"
            disabled={unreadCount === 0}
            onClick={() => {
              markAllNotificationsRead(user.id, 'checker');
              const updated = getNotifications(user.id, 'checker');
              setNotifications(updated);
            }}
            startIcon={<MarkEmailRead />}
          >
            Mark all as read
          </Button>
        </Paper>

        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <List>
              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No notifications" secondary="You're all caught up." />
                </ListItem>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                    <ListItem
                      button
                      onClick={() => handleNotificationClick(notification)}
                      sx={{
                        backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                        borderLeft: `4px solid #1976d2`,
                        mb: 1,
                        borderRadius: 1,
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                              {notification.title}
                            </Typography>
                            {!notification.read && <Badge color="primary" variant="dot" />}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">{notification.message}</Typography>
                            <Typography variant="caption" color="text.secondary">{formatDate(notification.createdAt)}</Typography>
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
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CheckerNotifications;