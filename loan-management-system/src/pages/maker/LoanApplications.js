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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoan } from '../../context/LoanContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const LoanApplications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { applications, getApplications, APPLICATION_STATUS } = useLoan();
  
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [loanTypeFilter, setLoanTypeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    // Load applications for maker role (run once on mount)
    getApplications({ role: 'maker' });
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
      case APPLICATION_STATUS.SUBMITTED:
        return 'warning';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'info';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'success';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return 'error';
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
      case APPLICATION_STATUS.SUBMITTED:
        return <Schedule fontSize="small" />;
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return <Warning fontSize="small" />;
      case APPLICATION_STATUS.MAKER_APPROVED:
        return <CheckCircle fontSize="small" />;
      case APPLICATION_STATUS.MAKER_REJECTED:
        return <Cancel fontSize="small" />;
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
      case APPLICATION_STATUS.SUBMITTED:
        return 'New Application';
      case APPLICATION_STATUS.UNDER_MAKER_REVIEW:
        return 'Under Review';
      case APPLICATION_STATUS.MAKER_APPROVED:
        return 'Approved by Maker';
      case APPLICATION_STATUS.MAKER_REJECTED:
        return 'Rejected by Maker';
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

  const handleQuickView = (application) => {
    setSelectedApplication(application);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setSelectedApplication(null);
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'maker_approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Loan Applications
        </Typography>
      </motion.div>

      {/* Statistics Cards */}
      <Box sx={{ 
        mb: 4, 
        width: 'calc(100% + 24px)',
        marginLeft: '-12px',
        marginRight: '-12px',
        display: 'flex', 
        gap: 2,
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        '& > *': {
          flex: '1 1 0',
          minWidth: 0
        }
      }}>
        {[
          { title: 'Total Applications', value: stats.total, color: 'primary', icon: <Assessment /> },
          { title: 'Pending Review', value: stats.pending, color: 'warning', icon: <Schedule /> },
          { title: 'Approved by Me', value: stats.approved, color: 'success', icon: <CheckCircle /> },
          { title: 'Rejected', value: stats.rejected, color: 'error', icon: <Cancel /> },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ 
              flex: '1 1 0',
              minWidth: 0,
              width: '100%'
            }}
          >
            <Card sx={{ height: '100%', width: '100%', borderRadius: 3 }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                minHeight: 120,
                width: '100%'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  height: '100%'
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      color="text.secondary" 
                      variant="body2"
                      sx={{ 
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        mb: 1,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: (theme) => theme.palette[stat.color].main, // Fixed color syntax
                        fontSize: '2rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    bgcolor: (theme) => theme.palette[stat.color].light, // Fixed color syntax
                    color: (theme) => theme.palette[stat.color].main,
                    width: 56,
                    height: 56,
                    ml: 2
                  }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card sx={{ 
          mb: 3,
          width: 'calc(100% + 24px)',
          marginLeft: '-12px',
          marginRight: '-12px'
        }}>
          <CardContent sx={{ px: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              alignItems: 'center',
              flexWrap: { xs: 'wrap', lg: 'nowrap' }
            }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 40%' } }}>
                <TextField
                  fullWidth
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 48%', md: '1 1 25%' } }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending Review</MenuItem>
                    <MenuItem value="maker_approved">Approved by Maker</MenuItem>
                    <MenuItem value="approved">Final Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: { xs: '1 1 48%', md: '1 1 25%' } }}>
                <FormControl fullWidth>
                  <InputLabel>Loan Type</InputLabel>
                  <Select
                    value={loanTypeFilter}
                    onChange={(e) => setLoanTypeFilter(e.target.value)}
                    label="Loan Type"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="home">Home Loan</MenuItem>
                    <MenuItem value="personal">Personal Loan</MenuItem>
                    <MenuItem value="vehicle">Vehicle Loan</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 auto' }, minWidth: '120px' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setLoanTypeFilter('all');
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Loan Details</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>CIBIL Score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Box>
                          <Assessment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary">
                            No applications found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try adjusting your search criteria
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow
                        key={application.id}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                              <Person />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {application.firstName} {application.lastName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: #{application.id}
                              </Typography>
                              <br />
                              <Typography variant="caption" color="text.secondary">
                                {application.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Chip
                              label={application.loanType?.toUpperCase()}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mb: 0.5 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {application.loanDuration} years
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {application.loanPurpose}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {formatCurrency(application.loanAmount)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Monthly: ₹{application.monthlySalary}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={application.cibilScore}
                            color={getCibilScoreColor(application.cibilScore)}
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(application.status)}
                            color={getStatusColor(application.status)}
                            icon={getStatusIcon(application.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(application.submittedAt).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Quick View">
                              <IconButton
                                size="small"
                                onClick={() => handleQuickView(application)}
                              >
                                <Visibility fontSize="small" />
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
                              onClick={() => navigate(`/maker/review/${application.id}`)}
                            >
                              View
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick View Dialog */}
      <Dialog
        open={quickViewOpen}
        onClose={handleCloseQuickView}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Quick View - Application #{selectedApplication?.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Personal Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Email:</strong> {selectedApplication.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Phone:</strong> {selectedApplication.phoneNumber}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Aadhar:</strong> {selectedApplication.aadharNumber}
                </Typography>
                <Typography variant="body2">
                  <strong>PAN:</strong> {selectedApplication.panNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Loan Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Type:</strong> {selectedApplication.loanType}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Amount:</strong> {formatCurrency(selectedApplication.loanAmount)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Duration:</strong> {selectedApplication.loanDuration} years
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Purpose:</strong> {selectedApplication.loanPurpose}
                </Typography>
                <Typography variant="body2">
                  <strong>CIBIL Score:</strong> 
                  <Chip
                    label={selectedApplication.cibilScore}
                    color={getCibilScoreColor(selectedApplication.cibilScore)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Employment Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Occupation:</strong> {selectedApplication.occupationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Company:</strong> {selectedApplication.companyName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Designation:</strong> {selectedApplication.designation}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Monthly Salary:</strong> ₹{selectedApplication.monthlySalary}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuickView}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCloseQuickView();
              navigate(`/maker/review/${selectedApplication.id}`); // Fixed template literal
            }}
          >
            Full Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoanApplications;