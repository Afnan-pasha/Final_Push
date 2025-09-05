import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Person,
  Schedule,
  CheckCircle,
  Cancel,
  Warning,
  TrendingUp,
  Assessment,
  VerifiedUser,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const CheckerApplications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { applications, getApplications, APPLICATION_STATUS } = useLoan();
  
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [loanTypeFilter, setLoanTypeFilter] = useState('all');
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Load applications for checker role (run once on mount)
    getApplications({ role: 'checker' });
    // Lightweight polling to keep list fresh, simulating real-time updates
    const intervalId = setInterval(() => {
      getApplications({ role: 'checker' });
    }, 3000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phoneNumber.includes(searchTerm) ||
        app.id.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply loan type filter
    if (loanTypeFilter !== 'all') {
      filtered = filtered.filter(app => app.loanType === loanTypeFilter);
    }

    // Sort by submission date (newest first)
    filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, loanTypeFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'info';
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return 'warning';
      case APPLICATION_STATUS.FINAL_APPROVED:
        return 'success';
      case APPLICATION_STATUS.FINAL_REJECTED:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return <Warning fontSize="small" />;
      case APPLICATION_STATUS.UNDER_CHECKER_REVIEW:
        return <Schedule fontSize="small" />;
      case APPLICATION_STATUS.FINAL_APPROVED:
        return <CheckCircle fontSize="small" />;
      case APPLICATION_STATUS.FINAL_REJECTED:
        return <Cancel fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Ready for Review';
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCibilScoreColor = (score) => {
    if (score >= 750) return 'success';
    if (score >= 650) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Paper
  elevation={3}
  sx={{
    p: 4,
    mb: 4,
    borderRadius: 3,
    backgroundColor: '#020b43',
    color: 'white'
  }}
>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#0473ea', mr: 2, width: 56, height: 56 }}>
                <VerifiedUser sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                  Final Review Applications
                </Typography>
                <Typography variant="body1" color="#FFFFFF">
                  Applications approved by makers for final review
                </Typography>
              </Box>
            </Box>
            <Chip
              label={`${filteredApplications.length} Applications`}
              color="primary"
              sx={{ fontSize: '1rem', px: 2, py: 1 }}
            />
          </Box>
        </Paper>

        {/* Filters */}
        <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <TextField
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flex: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value={APPLICATION_STATUS.MAKER_APPROVED}>Ready for Review</MenuItem>
                  <MenuItem value={APPLICATION_STATUS.UNDER_CHECKER_REVIEW}>Under Review</MenuItem>
                  <MenuItem value={APPLICATION_STATUS.FINAL_APPROVED}>Final Approved</MenuItem>
                  <MenuItem value={APPLICATION_STATUS.FINAL_REJECTED}>Final Rejected</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Loan Type</InputLabel>
                <Select
                  value={loanTypeFilter}
                  label="Loan Type"
                  onChange={(e) => setLoanTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="home">Home Loan</MenuItem>
                  <MenuItem value="personal">Personal Loan</MenuItem>
                  <MenuItem value="vehicle">Vehicle Loan</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ minWidth: 120 }}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setLoanTypeFilter('all');
                }}
              >
                Clear
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Application ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Applicant</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Loan Details</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>CIBIL Score</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Maker Approved</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">
                          No applications found for final review
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application, index) => (
                      <motion.tr
                        key={application.id}
                        component={TableRow}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {application.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
                              <Person />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {application.firstName} {application.lastName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {application.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {application.loanType} Loan
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatCurrency(application.loanAmount)} | {application.loanDuration} years
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={application.cibilScore}
                            color={getCibilScoreColor(application.cibilScore)}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(application.status)}
                            label={getStatusText(application.status)}
                            color={getStatusColor(application.status)}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {application.makerApprovedAt ? 
                              new Date(application.makerApprovedAt).toLocaleDateString() : 
                              'N/A'
                            }
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Tooltip title="Quick View">
                              <IconButton color="primary" onClick={() => { setSelectedApplication(application); setQuickViewOpen(true); }}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              sx={{
                                textTransform: 'none',
                                bgcolor: '#0473ea',
                                '&:hover': { bgcolor: '#1565c0' }
                              }}
                              onClick={() => navigate(`/checker/review/${application.id}`)}
                            >
                              View
                            </Button>
                          </Box>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onClose={() => setQuickViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Quick View - Application #{selectedApplication?.id}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApplication && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Applicant</Typography>
                  <Typography variant="body2"><strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {selectedApplication.email}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {selectedApplication.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Loan</Typography>
                  <Typography variant="body2"><strong>Type:</strong> {selectedApplication.loanType}</Typography>
                  <Typography variant="body2"><strong>Amount:</strong> {new Intl.NumberFormat('en-IN',{ style:'currency', currency:'INR', maximumFractionDigits:0 }).format(selectedApplication.loanAmount)}</Typography>
                  <Typography variant="body2"><strong>Duration:</strong> {selectedApplication.loanDuration} years</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><strong>Status:</strong> {selectedApplication.status}</Typography>
                  {selectedApplication.cibilScore && (
                    <Typography variant="body2"><strong>CIBIL Score:</strong> {selectedApplication.cibilScore}</Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuickViewOpen(false)}>Close</Button>
          {selectedApplication && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: 'none', bgcolor: '#0473ea', '&:hover': { bgcolor: '#1565c0' } }}
              onClick={() => { setQuickViewOpen(false); navigate(`/checker/review/${selectedApplication.id}`); }}
            >
              Open Full Application
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckerApplications;