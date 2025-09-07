import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
  Snackbar,
  LinearProgress,
  Avatar
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  Cancel,
  Assignment,
  AccountBalance,
  Visibility,
  Refresh,
  Notifications,
  Update,
  AccessTime,
  Timeline
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getLoanApplications } from '../../api/customerApi';

const LoanStatus = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [statusChanges, setStatusChanges] = useState(new Map());
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const previousApplicationsRef = useRef([]);
  const { user } = useAuth();

  // Application status constants - mapping backend enum values
  const APPLICATION_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED', 
    REJECTED: 'REJECTED',
    UNDER_REVIEW: 'UNDER_REVIEW',
    // Legacy status values for backward compatibility
    SUBMITTED: 'submitted',
    UNDER_MAKER_REVIEW: 'under_maker_review',
    MAKER_APPROVED: 'maker_approved',
    MAKER_REJECTED: 'maker_rejected',
    UNDER_CHECKER_REVIEW: 'under_checker_review',
    FINAL_APPROVED: 'final_approved',
    FINAL_REJECTED: 'final_rejected'
  };

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  // Set up polling for real-time updates
  useEffect(() => {
    if (user) {
      loadApplications();
      
      // Set up polling for real-time updates
      const interval = setInterval(() => {
        loadApplications(true); // Show notifications for polling updates
      }, 30000); // Poll every 30 seconds
      
      // Refresh on visibility change
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          loadApplications(true);
        }
      };
      
      // Refresh on window focus
      const handleFocus = () => {
        loadApplications(true);
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      
      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, [user]);

  // Clear status change indicators after 30 seconds
  useEffect(() => {
    if (statusChanges.size > 0) {
      const timeout = setTimeout(() => {
        setStatusChanges(new Map());
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [statusChanges]);

  const detectStatusChanges = (oldApps, newApps) => {
    const changes = [];
    newApps.forEach(newApp => {
      const oldApp = oldApps.find(app => app.id === newApp.id);
      if (oldApp && oldApp.status !== newApp.status) {
        changes.push({
          id: newApp.id,
          oldStatus: oldApp.status,
          newStatus: newApp.status,
          loanType: newApp.loanType
        });
      }
    });
    return changes;
  };

  const loadApplications = async (showNotification = false) => {
    try {
      setLoading(true);
      const result = await getLoanApplications();
      const newApplications = Array.isArray(result) ? result : [];
      
      // Check for status changes
      if (previousApplicationsRef.current.length > 0 && showNotification) {
        const changes = detectStatusChanges(previousApplicationsRef.current, newApplications);
        if (changes.length > 0) {
          setStatusChanges(new Map(changes.map(change => [change.id, {
            ...change,
            timestamp: new Date()
          }])));
          setUpdateMessage(`${changes.length} application(s) status updated`);
          setShowUpdateNotification(true);
        }
      }
      
      previousApplicationsRef.current = newApplications;
      setApplications(newApplications);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case APPLICATION_STATUS.PENDING:
      case APPLICATION_STATUS.SUBMITTED:
        return '#2196f3';
      case APPLICATION_STATUS.UNDER_REVIEW:
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return '#ff9800';
      case APPLICATION_STATUS.APPROVED:
      case APPLICATION_STATUS.MAKER_APPROVED:
      case APPLICATION_STATUS.FINAL_APPROVED:
        return '#4caf50';
      case APPLICATION_STATUS.REJECTED:
      case APPLICATION_STATUS.MAKER_REJECTED:
      case APPLICATION_STATUS.FINAL_REJECTED:
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toUpperCase()) {
      case APPLICATION_STATUS.PENDING:
      case APPLICATION_STATUS.SUBMITTED:
        return 'Submitted';
      case APPLICATION_STATUS.UNDER_REVIEW:
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved by Officer';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return 'Rejected by Officer';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return 'Final Review';
      case APPLICATION_STATUS.APPROVED:
      case APPLICATION_STATUS.FINAL_APPROVED:
        return 'Approved';
      case APPLICATION_STATUS.REJECTED:
      case APPLICATION_STATUS.FINAL_REJECTED:
        return 'Rejected';
      default:
        return status || 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case APPLICATION_STATUS.PENDING:
      case APPLICATION_STATUS.SUBMITTED:
        return <Schedule sx={{ color: '#2196f3' }} />;
      case APPLICATION_STATUS.UNDER_REVIEW:
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return <Schedule sx={{ color: '#ff9800' }} />;
      case APPLICATION_STATUS.APPROVED:
      case APPLICATION_STATUS.MAKER_APPROVED:
      case APPLICATION_STATUS.FINAL_APPROVED:
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case APPLICATION_STATUS.REJECTED:
      case APPLICATION_STATUS.MAKER_REJECTED:
      case APPLICATION_STATUS.FINAL_REJECTED:
        return <Cancel sx={{ color: '#f44336' }} />;
      default:
        return <Schedule sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getProgressSteps = (application) => {
    const steps = [
      { label: 'Application Submitted', status: [APPLICATION_STATUS.PENDING, APPLICATION_STATUS.SUBMITTED] },
      { label: 'Under Review', status: [APPLICATION_STATUS.UNDER_REVIEW, APPLICATION_STATUS.UNDER_MAKER_REVIEW] },
      { label: 'Decision Made', status: [APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.MAKER_APPROVED, APPLICATION_STATUS.FINAL_APPROVED] },
    ];

    const currentStatus = application.status?.toUpperCase();
    let currentStep = -1;
    
    steps.forEach((step, index) => {
      if (step.status.some(s => s === currentStatus)) {
        currentStep = index;
      }
    });
    
    // If approved or rejected, show as completed
    if (currentStatus === APPLICATION_STATUS.APPROVED || currentStatus === APPLICATION_STATUS.REJECTED) {
      currentStep = steps.length - 1;
    }
    
    return { steps: steps.map(s => ({ label: s.label })), currentStep: Math.max(0, currentStep) };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <LinearProgress sx={{ width: '50%' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #020b43 0%, #020b43 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2, width: 60, height: 60 }}>
                <Timeline sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Loan Application Status
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Track your loan applications in real-time
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {lastUpdated && (
                <Tooltip title={`Last updated: ${lastUpdated.toLocaleTimeString()}`}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', opacity: 0.8 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption">
                      {lastUpdated.toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Tooltip>
              )}
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => loadApplications(true)}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Applications */}
        {applications.length === 0 ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Assignment sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No Applications Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You haven't submitted any loan applications yet.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AccountBalance />}
              onClick={() => navigate('/customer/apply-loan')}
            >
              Apply for Loan
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {applications.map((application, index) => (
              <Grid item xs={12} key={application.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    {/* Application Header */}
                    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Application ID: {application.id}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {statusChanges.has(application.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Tooltip title="Status recently updated">
                                <Badge
                                  badgeContent={<Update sx={{ fontSize: 12 }} />}
                                  color="secondary"
                                  sx={{
                                    '& .MuiBadge-badge': {
                                      backgroundColor: '#ff4081',
                                      animation: 'pulse 2s infinite'
                                    }
                                  }}
                                >
                                  <Chip
                                    icon={getStatusIcon(application.status)}
                                    label={getStatusLabel(application.status)}
                                    sx={{
                                      backgroundColor: getStatusColor(application.status),
                                      color: 'white',
                                      fontWeight: 'bold',
                                      animation: 'glow 2s ease-in-out infinite alternate'
                                    }}
                                  />
                                </Badge>
                              </Tooltip>
                            </motion.div>
                          )}
                          {!statusChanges.has(application.id) && (
                            <Chip
                              icon={getStatusIcon(application.status)}
                              label={getStatusLabel(application.status)}
                              sx={{
                                backgroundColor: getStatusColor(application.status),
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Loan Type:</strong> {application.loanType}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Amount:</strong> {formatCurrency(application.loanAmount)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Duration:</strong> {application.loanTermMonths ? `${Math.round(application.loanTermMonths / 12)} years` : `${application.loanDuration} years`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Submitted:</strong> {new Date(application.applicationDate || application.submittedAt).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* Progress Stepper */}
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Application Progress
                      </Typography>
                      
                      <Stepper activeStep={getProgressSteps(application).currentStep} orientation="horizontal" sx={{ mb: 4 }}>
                        {getProgressSteps(application).steps.map((step, stepIndex) => (
                          <Step key={stepIndex}>
                            <StepLabel>{step.label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      {/* Comments Section */}
                      {(application.makerComments || application.checkerComments) && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Comments & Feedback
                          </Typography>
                          
                          {application.makerComments && (
                            <Alert severity="info" sx={{ mb: 2 }}>
                              <Typography variant="body2">
                                <strong>Loan Officer:</strong> {application.makerComments}
                              </Typography>
                            </Alert>
                          )}
                          
                          {application.checkerComments && (
                            <Alert severity={application.status === APPLICATION_STATUS.FINAL_APPROVED ? 'success' : 'error'}>
                              <Typography variant="body2">
                                <strong>Senior Officer:</strong> {application.checkerComments}
                              </Typography>
                            </Alert>
                          )}
                        </Box>
                      )}

                      {/* Status History */}
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Status History
                        {statusChanges.has(application.id) && (
                          <Chip
                            size="small"
                            label="Recently Updated"
                            color="secondary"
                            sx={{ ml: 1, fontSize: '0.7rem' }}
                          />
                        )}
                      </Typography>
                      
                      <List>
                        {/* Current Status (Real-time) */}
                        <motion.div
                          key={`current-${application.status}`}
                          initial={statusChanges.has(application.id) ? { scale: 0.9, opacity: 0 } : false}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ListItem 
                            sx={{ 
                              px: 0,
                              backgroundColor: statusChanges.has(application.id) ? 'rgba(255, 64, 129, 0.1)' : 'transparent',
                              borderRadius: 1,
                              mb: 1
                            }}
                          >
                            <ListItemIcon>
                              {getStatusIcon(application.status)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {getStatusLabel(application.status)} (Current)
                                  </Typography>
                                  {statusChanges.has(application.id) && (
                                    <Chip
                                      size="small"
                                      label="NEW"
                                      color="secondary"
                                      sx={{ fontSize: '0.6rem', height: 20 }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {application.makerComments || application.checkerComments || 'Status updated in real-time'}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Last updated: {new Date(application.lastModified || application.applicationDate).toLocaleString()}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        </motion.div>
                        
                        {/* Historical Status */}
                        {application.statusHistory?.map((history, historyIndex) => (
                          <React.Fragment key={historyIndex}>
                            <ListItem sx={{ px: 0, opacity: 0.7 }}>
                              <ListItemIcon>
                                {getStatusIcon(history.status)}
                              </ListItemIcon>
                              <ListItemText
                                primary={getStatusLabel(history.status)}
                                secondary={
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      {history.comments}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(history.timestamp).toLocaleString()}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                            {historyIndex < application.statusHistory.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>

                      {/* Next Steps */}
                      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Next Steps:</strong>{' '}
                          {(application.status?.toUpperCase() === APPLICATION_STATUS.PENDING || application.status === APPLICATION_STATUS.SUBMITTED) && 'Your application is being reviewed by our loan officer.'}
                          {(application.status?.toUpperCase() === APPLICATION_STATUS.UNDER_REVIEW || application.status === APPLICATION_STATUS.UNDER_MAKER_REVIEW) && 'Your application is currently under review by our loan officer.'}
                          {application.status === APPLICATION_STATUS.MAKER_APPROVED && 'Your application has been approved by the loan officer and is now under final review.'}
                          {(application.status?.toUpperCase() === APPLICATION_STATUS.REJECTED || application.status === APPLICATION_STATUS.MAKER_REJECTED || application.status === APPLICATION_STATUS.FINAL_REJECTED) && 'Your application has been rejected. Please review any comments above or contact us for more information.'}
                          {application.status === APPLICATION_STATUS.UNDER_CHECKER_REVIEW && 'Your application is under final review by our senior officer.'}
                          {(application.status?.toUpperCase() === APPLICATION_STATUS.APPROVED || application.status === APPLICATION_STATUS.FINAL_APPROVED) && 'Congratulations! Your loan has been approved. You will be contacted shortly with next steps.'}
                          {!application.status && 'Status information is being updated. Please check back shortly.'}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

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
                startIcon={<Visibility />}
                onClick={() => navigate('/customer/notifications')}
                sx={{ py: 1.5 }}
              >
                View Notifications
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Status Update Notification */}
        <Snackbar
          open={showUpdateNotification}
          autoHideDuration={6000}
          onClose={() => setShowUpdateNotification(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setShowUpdateNotification(false)} 
            severity="info" 
            sx={{ width: '100%' }}
            icon={<Notifications />}
          >
            {updateMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

// Add CSS animations for glow and pulse effects
const style = document.createElement('style');
style.textContent = `
  @keyframes glow {
    from { box-shadow: 0 0 5px rgba(255, 64, 129, 0.5); }
    to { box-shadow: 0 0 20px rgba(255, 64, 129, 0.8); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

export default LoanStatus;