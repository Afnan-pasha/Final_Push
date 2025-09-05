import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Chip,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Schedule,
  Cancel,
  Warning,
  Person,
  AccountBalance,
  Timeline,
  Refresh,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { getLoanApplications, formatApiError } from '../../api/customerApi';

const LoanStatus = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Application status constants
  const APPLICATION_STATUS = {
    SUBMITTED: 'submitted',
    UNDER_MAKER_REVIEW: 'under_maker_review',
    MAKER_APPROVED: 'maker_approved',
    MAKER_REJECTED: 'maker_rejected',
    UNDER_CHECKER_REVIEW: 'under_checker_review',
    FINAL_APPROVED: 'final_approved',
    FINAL_REJECTED: 'final_rejected'
  };

  useEffect(() => {
    loadApplications();

    // Poll for live updates every 15 seconds
    const intervalId = setInterval(() => {
      loadApplications();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const result = await getLoanApplications({
        userId: user?.id || user?.email
      });
      setApplications(result || []);
    } catch (error) {
      console.error('Failed to load applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
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
      case APPLICATION_STATUS.SUBMITTED:
        return 'Submitted';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved by Officer';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return 'Rejected by Officer';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return 'Final Review';
      case APPLICATION_STATUS.FINAL_APPROVED:
        return 'Approved';
      case APPLICATION_STATUS.FINAL_REJECTED:
        return 'Rejected';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case APPLICATION_STATUS.SUBMITTED:
        return <Schedule sx={{ color: '#2196f3' }} />;
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return <Schedule sx={{ color: '#ff9800' }} />;
      case APPLICATION_STATUS.MAKER_APPROVED:
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case APPLICATION_STATUS.MAKER_REJECTED:
        return <Cancel sx={{ color: '#f44336' }} />;
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return <Schedule sx={{ color: '#ff9800' }} />;
      case APPLICATION_STATUS.FINAL_APPROVED:
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case APPLICATION_STATUS.FINAL_REJECTED:
        return <Cancel sx={{ color: '#f44336' }} />;
      default:
        return <Schedule sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getProgressSteps = (application) => {
    const steps = [
      { label: 'Application Submitted', status: APPLICATION_STATUS.SUBMITTED },
      { label: 'Under Officer Review', status: APPLICATION_STATUS.UNDER_MAKER_REVIEW },
      { label: 'Officer Decision', status: APPLICATION_STATUS.MAKER_APPROVED },
      { label: 'Final Review', status: APPLICATION_STATUS.UNDER_CHECKER_REVIEW },
      { label: 'Final Decision', status: APPLICATION_STATUS.FINAL_APPROVED },
    ];

    const currentStatusIndex = steps.findIndex(step => step.status === application.status);
    return { steps, currentStep: currentStatusIndex };
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
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={loadApplications}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Refresh
            </Button>
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
                        <Chip
                          icon={getStatusIcon(application.status)}
                          label={getStatusLabel(application.status)}
                          sx={{
                            backgroundColor: getStatusColor(application.status),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
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
                            <strong>Duration:</strong> {application.loanDuration} years
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}
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
                      </Typography>
                      
                      <List>
                        {application.statusHistory?.map((history, historyIndex) => (
                          <React.Fragment key={historyIndex}>
                            <ListItem sx={{ px: 0 }}>
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
                          {application.status === APPLICATION_STATUS.SUBMITTED && 'Your application is being reviewed by our loan officer.'}
                          {application.status === APPLICATION_STATUS.UNDER_MAKER_REVIEW && 'Your application is currently under review by our loan officer.'}
                          {application.status === APPLICATION_STATUS.MAKER_APPROVED && 'Your application has been approved by the loan officer and is now under final review.'}
                          {application.status === APPLICATION_STATUS.MAKER_REJECTED && 'Your application has been rejected. Please review the comments above.'}
                          {application.status === APPLICATION_STATUS.UNDER_CHECKER_REVIEW && 'Your application is under final review by our senior officer.'}
                          {application.status === APPLICATION_STATUS.FINAL_APPROVED && 'Congratulations! Your loan has been approved. You will be contacted shortly with next steps.'}
                          {application.status === APPLICATION_STATUS.FINAL_REJECTED && 'Your loan application has been rejected. Please review the comments above.'}
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
      </motion.div>
    </Container>
  );
};

export default LoanStatus;