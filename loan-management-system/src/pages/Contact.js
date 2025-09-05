import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Support,
  QuestionAnswer,
  Feedback,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 40, color: '#0f1a3e' }} />,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: <Email sx={{ fontSize: 40, color: '#0f1a3e' }} />,
      title: 'Email',
      details: ['info@sc.com', 'support@sc.com'],
      description: 'Send us your queries anytime'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: '#0f1a3e' }} />,
      title: 'Address',
      details: ['Standard Chartered Financial Services', 'Bangalore, Karnataka, 560103'],
      description: 'Visit our office for personal consultation'
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: '#0f1a3e' }} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      description: 'We are here to help during business hours'
    }
  ];

  const supportOptions = [
    {
      icon: <Support sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Customer Support',
      description: 'Get help with your existing loans and applications',
      contact: 'Call: +91 98765 43210'
    },
    {
      icon: <QuestionAnswer sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Loan Enquiry',
      description: 'Have questions about our loan products?',
      contact: 'Email: loans@sc.com'
    },
    {
      icon: <Feedback sx={{ fontSize: 50, color: '#4caf50' }} />,
      title: 'Feedback',
      description: 'Share your experience and suggestions with us',
      contact: 'Email: feedback@sc.com'
    }
  ];

  const branches = [
    {
      city: 'Mumbai',
      address: 'Standard Chartered Tower, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 98765 43210',
      email: 'mumbai@sc.com'
    },
    {
      city: 'Delhi',
      address: 'Standard Chartered Plaza, Connaught Place, New Delhi - 110001',
      phone: '+91 98765 43211',
      email: 'delhi@sc.com'
    },
    {
      city: 'Bangalore',
      address: 'Standard Chartered GBS, Eco World, Bangalore - 560103',
      phone: '+91 98765 43212',
      email: 'bangalore@sc.com'
    },
    {
      city: 'Chennai',
      address: 'LoanEase Building, Anna Salai, Chennai - 600002',
      phone: '+91 98765 43213',
      email: 'chennai@sc.com'
    }
  ];



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
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, md: 6 } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              We're here to help you with all your loan requirements. Get in touch with our expert team today.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 3, sm: 4, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Get In Touch
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            Multiple ways to reach us for all your queries and support needs
          </Typography>
        </motion.div>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          px: 4,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 2
        }}>
          {contactInfo.map((info, index) => (
            <Box key={index} sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 45%', md: '0 0 auto' },
              maxWidth: { xs: '100%', sm: '45%', md: 'none' }
            }}>
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
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
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
                        {info.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                        {info.title}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                      {info.details.map((detail, idx) => (
                        <Typography key={idx} variant="body2" sx={{ mb: 0.5, fontWeight: 'bold', color: '#1e2a5e', fontSize: '0.85rem' }}>
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem', mt: 1 }}>
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>

      {/*
        Contact Form (commented out as requested)
        <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                      Send us a Message
                    </Typography>
                    
                    {submitted && (
                      <Alert severity="success" sx={{ mb: 3 }}>
                        Thank you for your message! We'll get back to you within 24 hours.
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Subject"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={6}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            required
                            variant="outlined"
                            placeholder="Please describe your query or requirement in detail..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                          >
                            {loading ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </motion.div>
              </Grid>


            </Grid>
          </Container>
        </Box>
      */}

      {/*
        Support Options (commented out as requested)
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Support Options
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
              Multiple support channels to help you with all your queries and needs
            </Typography>
          </motion.div>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            px: 4,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 2
          }}>
            {supportOptions.map((option, index) => (
              <Box key={index} sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '0 0 auto' },
                maxWidth: { xs: '100%', sm: '45%', md: 'none' }
              }}>
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
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }
                    }}
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
                          {option.icon}
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                          {option.title}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '0.85rem', textAlign: 'center' }}>
                          {option.description}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e2a5e', fontSize: '0.8rem', textAlign: 'center', mt: 1 }}>
                        {option.contact}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Container>
      */}

      {/* Branch Locations */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Our Branches
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
            Visit us at any of our branch locations across India
          </Typography>
        </motion.div>

        <Grid container spacing={2} justifyContent="center">
          {branches.map((branch, index) => (
            <Grid item xs={3} sm={3} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: 220,
                    width: '100%',
                    maxWidth: 250,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#1e2a5e', fontSize: '1rem' }}>
                      {branch.city}
                    </Typography>
                    <List dense sx={{ py: 0 }}>
                      <ListItem sx={{ px: 0, py: 0.3 }}>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <LocationOn sx={{ color: '#666', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.address}
                          primaryTypographyProps={{ variant: 'body2', fontSize: '0.75rem', lineHeight: 1.2 }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.3 }}>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <Phone sx={{ color: '#666', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.phone}
                          primaryTypographyProps={{ variant: 'body2', fontSize: '0.75rem' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.3 }}>
                        <ListItemIcon sx={{ minWidth: 25 }}>
                          <Email sx={{ color: '#666', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={branch.email}
                          primaryTypographyProps={{ variant: 'body2', fontSize: '0.75rem' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Find Us
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666' }}>
              Our head office location in Mumbai
            </Typography>
          </motion.div>

          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', height: 400 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.95)' }}>
                  <LocationOn sx={{ fontSize: 40, color: '#1e2a5e', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Standard Chartered Head Office
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bangalore, Karnataka, India
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </Box>
  );
};

export default Contact;