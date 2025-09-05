import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  DirectionsCar,
  Person,
  Business,
  CheckCircle,
  ExpandMore,
  Calculate,
  TrendingUp,
  Security,
  Speed,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Loans = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const loanTypes = [
    {
      id: 'home',
      title: 'Home Loans',
      subtitle: 'Make your dream home a reality',
      description: 'Get competitive home loan rates with flexible repayment options and quick processing.',
      icon: <AccountBalance sx={{ fontSize: 60, color: '#0f1a3e' }} />,
      rate: '8.5%',
      maxAmount: '₹5 Crore',
      tenure: '30 years',
      features: [
        'Competitive interest rates starting from 8.5%',
        'Loan amount up to ₹5 Crore',
        'Flexible repayment tenure up to 30 years',
        'Minimal documentation required',
        'Quick approval within 24-48 hours',
        'No prepayment charges after 1 year',
        'Tax benefits under Section 80C and 24(b)',
        'Balance transfer facility available'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹25,000 per month',
        'Employment: Salaried/Self-employed',
        'CIBIL Score: 650 and above',
        'Work experience: 2+ years'
      ],
      documents: [
        'Identity proof (Aadhar/PAN/Passport)',
        'Address proof (Utility bills/Rent agreement)',
        'Income proof (Salary slips/ITR)',
        'Bank statements (6 months)',
        'Property documents',
        'Employment proof'
      ]
    },
    {
      id: 'personal',
      title: 'Personal Loans',
      subtitle: 'Instant funds for your personal needs',
      description: 'Quick and hassle-free personal loans with minimal documentation and instant approval.',
      icon: <Person sx={{ fontSize: 60, color: '#0f1a3e' }} />,
      rate: '11.5%',
      maxAmount: '₹40 Lakhs',
      tenure: '7 years',
      features: [
        'Interest rates starting from 11.5%',
        'Loan amount up to ₹40 Lakhs',
        'Flexible tenure up to 7 years',
        'No collateral required',
        'Instant approval and disbursal',
        'Minimal documentation',
        'Online application process',
        'Prepayment allowed without charges'
      ],
      eligibility: [
        'Age: 21-60 years',
        'Minimum income: ₹20,000 per month',
        'Employment: Salaried/Self-employed',
        'CIBIL Score: 650 and above',
        'Work experience: 1+ years'
      ],
      documents: [
        'Identity proof (Aadhar/PAN)',
        'Address proof',
        'Income proof (Salary slips/ITR)',
        'Bank statements (3 months)',
        'Employment certificate'
      ]
    },
    {
      id: 'vehicle',
      title: 'Vehicle Loans',
      subtitle: 'Drive your dream car today',
      description: 'Affordable car and bike loans with attractive interest rates and flexible EMI options.',
      icon: <DirectionsCar sx={{ fontSize: 60, color: '#0f1a3e' }} />,
      rate: '9.5%',
      maxAmount: '₹1 Crore',
      tenure: '7 years',
      features: [
        'Competitive rates starting from 9.5%',
        'Finance up to 90% of vehicle value',
        'Loan amount up to ₹1 Crore',
        'Flexible repayment up to 7 years',
        'Quick processing and approval',
        'New and used vehicle financing',
        'Insurance facility available',
        'Doorstep service available'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹15,000 per month',
        'Employment: Salaried/Self-employed',
        'CIBIL Score: 600 and above',
        'Valid driving license required'
      ],
      documents: [
        'Identity and address proof',
        'Income proof',
        'Bank statements',
        'Vehicle quotation/invoice',
        'Driving license',
        'Insurance documents'
      ]
    },
    {
      id: 'business',
      title: 'Business Loans',
      subtitle: 'Fuel your business growth',
      description: 'Flexible business loans to help you expand, purchase equipment, or manage working capital.',
      icon: <Business sx={{ fontSize: 60, color: '#0f1a3e' }} />,
      rate: '12.0%',
      maxAmount: '₹50 Lakhs',
      tenure: '5 years',
      features: [
        'Interest rates starting from 12%',
        'Loan amount up to ₹50 Lakhs',
        'Flexible tenure up to 5 years',
        'Working capital and term loans',
        'Quick approval process',
        'Minimal collateral requirements',
        'Overdraft facility available',
        'Business advisory support'
      ],
      eligibility: [
        'Business vintage: 2+ years',
        'Annual turnover: ₹10 Lakhs+',
        'CIBIL Score: 650 and above',
        'Profitable business operations',
        'Valid business registration'
      ],
      documents: [
        'Business registration documents',
        'Financial statements (2 years)',
        'Bank statements (12 months)',
        'ITR and GST returns',
        'Identity and address proof',
        'Business plan (if required)'
      ]
    }
  ];

  const interestRates = [
    { loanType: 'Home Loan', rate: '8.5% - 10.5%', processingFee: '0.5% - 1%' },
    { loanType: 'Personal Loan', rate: '11.5% - 18%', processingFee: '1% - 3%' },
    { loanType: 'Vehicle Loan', rate: '9.5% - 14%', processingFee: '1% - 2%' },
    { loanType: 'Business Loan', rate: '12% - 20%', processingFee: '1% - 2%' },
  ];

  const faqs = [
    {
      question: 'What is the minimum CIBIL score required for a loan?',
      answer: 'Generally, we require a minimum CIBIL score of 650 for most loan products. However, for vehicle loans, we may consider applications with a score of 600 and above.'
    },
    {
      question: 'How long does the loan approval process take?',
      answer: 'Our digital loan approval process typically takes 24-48 hours for most loan products. Personal loans can be approved and disbursed within a few hours for eligible customers.'
    },
    {
      question: 'Can I prepay my loan without any charges?',
      answer: 'Yes, we allow prepayment for most loan products. Home loans have no prepayment charges after 1 year, while personal loans can be prepaid anytime without charges.'
    },
    {
      question: 'What documents are required for loan application?',
      answer: 'Basic documents include identity proof, address proof, income proof, and bank statements. Specific requirements vary by loan type and are listed in each loan product section.'
    },
    {
      question: 'Is there any processing fee for loans?',
      answer: 'Yes, processing fees vary by loan type and typically range from 0.5% to 3% of the loan amount. The exact fee structure is provided during the application process.'
    },
    {
      question: 'Can I apply for a loan online?',
      answer: 'Yes, our entire loan application process is digital. You can apply online, upload documents, and track your application status through our platform.'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const currentLoan = loanTypes[selectedTab];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #020b43 0%, #020b43 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>

            </Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Loan Products
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              Choose from our comprehensive range of loan products designed to meet your specific financial needs
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: '#1976d2',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Apply Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Loan Types Overview */}
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 3, sm: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Our Loan Products
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            Competitive rates, flexible terms, and quick approval process
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" sx={{ px: 4 }}>
          {loanTypes.slice(0, 3).map((loan, index) => (
            <Grid item key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: 280,
                    width: 250,
                    minWidth: 250,
                    maxWidth: 250,
                    mx: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => setSelectedTab(index)}
                >
                  <CardContent sx={{ 
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ mb: 1.5 }}>
                        {React.cloneElement(loan.icon, { sx: { fontSize: 40, color: '#0f1a3e' } })}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                        {loan.title}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                      <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '0.85rem', textAlign: 'center' }}>
                        {loan.subtitle}
                      </Typography>
                      <Chip
                        label={`From ${loan.rate} p.a.`}
                        color="primary"
                        size="small"
                        sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.7rem' }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', textAlign: 'center', mt: 1 }}>
                      Up to {loan.maxAmount}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Detailed Loan Information */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                backgroundColor: '#0f1a3e',
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                  '&.Mui-selected': {
                    color: 'white'
                  }
                }
              }}
            >
              {loanTypes.map((loan, index) => (
                <Tab key={index} label={loan.title} />
              ))}
            </Tabs>

            <Box sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    {currentLoan.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {currentLoan.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {currentLoan.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {currentLoan.description}
                  </Typography>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Key Features
                  </Typography>
                  <List>
                    {currentLoan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                      Loan Highlights
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">Interest Rate</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0f1a3e' }}>
                        Starting from {currentLoan.rate}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">Maximum Amount</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {currentLoan.maxAmount}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">Maximum Tenure</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Up to {currentLoan.tenure}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{ py: 1.5, fontSize: '1.1rem' }}
                    >
                      Apply Now
                    </Button>
                  </Paper>

                  <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Quick Benefits
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Speed sx={{ color: '#4caf50', mr: 1 }} />
                      <Typography variant="body2">Quick Approval</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Security sx={{ color: '#4caf50', mr: 1 }} />
                      <Typography variant="body2">Secure Process</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                      <Typography variant="body2">Competitive Rates</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Eligibility Criteria
                  </Typography>
                  <List>
                    {currentLoan.eligibility.map((criteria, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: '#0f1a3e', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={criteria} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Required Documents
                  </Typography>
                  <List>
                    {currentLoan.documents.map((document, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: '#0f1a3e', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={document} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Interest Rates Table */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Interest Rates & Fees
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
            Transparent pricing with competitive rates
          </Typography>
        </motion.div>

        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#0f1a3e' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Loan Type
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Interest Rate (p.a.)
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Processing Fee
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interestRates.map((rate, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    {rate.loanType}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem', color: '#1976d2', fontWeight: 'bold' }}>
                    {rate.rate}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>
                    {rate.processingFee}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
              Get answers to common questions about our loan products
            </Typography>
          </motion.div>

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Accordion
                elevation={2}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { margin: '0 0 16px 0' }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    '&.Mui-expanded': { borderRadius: '8px 8px 0 0' }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#1e2a5e', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Ready to Apply?
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Start your loan application today and get approved in just 24-48 hours
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#1976d2',
                    px: 4,
                    py: 2,
                    fontSize: '1.2rem',
                    '&:hover': { backgroundColor: '#1976d2' }
                  }}
                >
                  Apply Now
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Loans;