import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Work,
  AccountBalance,
  Assignment,
  People,
  CheckCircle,
  Cancel,
  Comment,
  Visibility,
  Download,
  ArrowBack,
  TrendingUp,
  Warning,
  AttachFile,
  CreditScore,
  Timeline,
  VerifiedUser,
  Gavel,
  Assessment,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import { motion } from 'framer-motion';

const CheckerReview = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { getApplication, finalApprove, finalReject, loading, APPLICATION_STATUS } = useLoan();
  
  const [application, setApplication] = useState(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [actionDialog, setActionDialog] = useState({ open: false, type: null });
  const [comments, setComments] = useState('');

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    setLoadingApp(true);
    const result = await getApplication(applicationId);
    if (result.success) {
      setApplication(result.application);
    } else {
      alert('Application not found');
      navigate('/checker/applications');
    }
    setLoadingApp(false);
  };

  const handleAction = async (action) => {
    if (!comments.trim()) {
      alert('Please provide comments for your final decision');
      return;
    }

    let result;
    if (action === 'approve') {
      result = await finalApprove(application.id, comments);
    } else {
      result = await finalReject(application.id, comments);
    }

    if (result.success) {
      alert(`Application ${action}d successfully`);
      setActionDialog({ open: false, type: null });
      setComments('');
      // Redirect to Checker Dashboard after successful final decision
      navigate('/checker/dashboard');
    } else {
      alert(result.error || `Failed to ${action} application`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getCibilScoreColor = (score) => {
    if (score >= 750) return '#4caf50';
    if (score >= 650) return '#ff9800';
    return '#f44336';
  };

  const getCibilScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    return 'Poor';
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
        return '#ff9800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved by Maker';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return 'Under Final Review';
      case APPLICATION_STATUS.FINAL_APPROVED:
        return 'Final Approved';
      case APPLICATION_STATUS.FINAL_REJECTED:
        return 'Final Rejected';
      default:
        return status;
    }
  };

  if (loadingApp) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!application) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Application not found</Alert>
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
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #020b43 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/checker/dashboard')} sx={{ mr: 2, color: 'white' }}>
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Final Review - {application.id}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Senior Officer Final Decision
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Approved by Maker"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 2,
                py: 1,
              }}
            />
          </Box>
          
          {/* CIBIL Score */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditScore sx={{ fontSize: 30 }} />
              <Typography variant="h6">
                CIBIL Score: 
                <span style={{ fontWeight: 'bold', marginLeft: 8 }}>
                  {application.cibilScore} ({getCibilScoreLabel(application.cibilScore)})
                </span>
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(application.cibilScore / 850) * 100}
              sx={{
                width: 200,
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                },
              }}
            />
          </Box>
        </Paper>

        {/* Maker's Decision */}
        {application.makerComments && (
          <Alert severity="info" sx={{ mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Maker's Decision & Comments
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> Approved by Loan Officer
            </Typography>
            <Typography variant="body1">
              <strong>Comments:</strong> {application.makerComments}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Approved on:</strong> {application.makerApprovedAt ? new Date(application.makerApprovedAt).toLocaleString() : 'N/A'}
            </Typography>
          </Alert>
        )}

        {/* Personal Details */}
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Person sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Personal Details
              </Typography>
            </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Full Name:</strong> {application.firstName} {application.middleName} {application.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {application.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Phone:</strong> {application.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Aadhar:</strong> {application.aadharNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>PAN:</strong> {application.panNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>DOB:</strong> {new Date(application.dateOfBirth).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Age:</strong> {application.age} years
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        {/* Employment Details */}
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Work sx={{ color: '#020b43', mr: 2, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Employment Details
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Occupation:</strong> {application.occupationType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Company:</strong> {application.companyName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Monthly Salary:</strong> {formatCurrency(application.monthlySalary)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Office Address:</strong> {application.officeAddress}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Loan Details */}
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccountBalance sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Loan Details
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Loan Type:</strong> {application.loanType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Amount:</strong> {formatCurrency(application.loanAmount)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Duration:</strong> {application.loanDuration} years
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Purpose:</strong> {application.loanPurpose}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Assessment sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Risk Assessment
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    <strong>CIBIL Score:</strong>
                  </Typography>
                  <Chip
                    label={`${application.cibilScore} - ${getCibilScoreLabel(application.cibilScore)}`}
                    sx={{
                      backgroundColor: getCibilScoreColor(application.cibilScore),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Loan to Income Ratio:</strong> {((application.loanAmount / (application.monthlySalary * 12)) * 100).toFixed(1)}%
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Existing Loans:</strong> {application.existingLoans?.length || 0}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Status History */}
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Timeline sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Application Timeline
              </Typography>
            </Box>
            
            <List>
              {application.statusHistory?.map((history, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: getStatusColor(history.status), width: 32, height: 32 }}>
                      {index + 1}
                    </Avatar>
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
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Final Decision Buttons */}
        {[APPLICATION_STATUS.MAKER_APPROVED, APPLICATION_STATUS.UNDER_CHECKER_REVIEW].includes(application.status) && (
          <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <Gavel sx={{ color: '#1976d2', mr: 2, fontSize: 40 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Final Decision Required
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              As the senior officer, you have the authority to make the final decision on this loan application.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<CheckCircle />}
                onClick={() => setActionDialog({ open: true, type: 'approve' })}
                sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
              >
                Final Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<Cancel />}
                onClick={() => setActionDialog({ open: true, type: 'reject' })}
                sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
              >
                Final Reject
              </Button>
            </Box>
          </Paper>
        )}

        {/* Final Decision Dialog */}
        <Dialog
          open={actionDialog.open}
          onClose={() => setActionDialog({ open: false, type: null })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: actionDialog.type === 'approve' ? '#4caf50' : '#f44336' }}>
              {actionDialog.type === 'approve' ? 'Final Approval' : 'Final Rejection'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity={actionDialog.type === 'approve' ? 'success' : 'error'} sx={{ mb: 3 }}>
              <Typography variant="body2">
                {actionDialog.type === 'approve' 
                  ? 'You are about to give final approval to this loan application. This decision is final and will complete the loan approval process.'
                  : 'You are about to reject this loan application. This decision is final and the application will be closed.'
                }
              </Typography>
            </Alert>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please provide detailed comments for your final decision:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your detailed comments and reasoning for this decision..."
              variant="outlined"
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setActionDialog({ open: false, type: null })}
              size="large"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAction(actionDialog.type)}
              variant="contained"
              color={actionDialog.type === 'approve' ? 'success' : 'error'}
              disabled={loading}
              size="large"
              sx={{ px: 4 }}
            >
              {loading ? <CircularProgress size={20} /> : `Confirm ${actionDialog.type === 'approve' ? 'Approval' : 'Rejection'}`}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default CheckerReview;