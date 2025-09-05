import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalance,
  Security,
  Speed,
  Support,
  TrendingUp,
  CheckCircle,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  Star,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { color, motion } from 'framer-motion';
import Logo from '../components/Logo';
import StandardCard from '../components/common/StandardCard';
import scHero1 from '../assets/images/sc-hero-1.jpg';
import scHero2 from '../assets/images/sc-hero-2.jpg';
import scOffice from '../assets/images/sc-office.jpg';

const NewLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero images for sliding
  const heroImages = [
    {
      url: scHero1,
      title: 'Your Financial Future Starts Here',
      subtitle: 'Experience world-class banking with Standard Chartered - your trusted partner for all financial needs'
    },
    {
      url: scHero2,
      title: 'Innovation in Banking',
      subtitle: 'Cutting-edge financial solutions designed to help you achieve your dreams and aspirations'
    },
    {
      url: scOffice,
      title: 'Global Excellence, Local Service',
      subtitle: 'With our worldwide presence and local expertise, we bring you the best of both worlds'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Loans', path: '/loans' },
    { label: 'Contact', path: '/contact' },
    { label: 'Login', path: '/login' },
  ];

  const loanTypes = [
    {
      title: 'Home Loans',
      description: 'Fulfill your dream of owning a home with our competitive home loan rates',
      rate: '8.5%',
      features: ['Up to ₹5 Crore', 'Tenure up to 30 years', 'Minimal documentation'],
      icon: <AccountBalance sx={{ fontSize: 40, color: '#020b43' }} />
    },
    {
      title: 'Personal Loans',
      description: 'Quick and hassle-free personal loans for all your needs',
      rate: '11.5%',
      features: ['Up to ₹40 Lakhs', 'Instant approval', 'No collateral required'],
      icon: <TrendingUp sx={{ fontSize: 40, color: '#020b43' }} />
    },
    {
      title: 'Vehicle Loans',
      description: 'Drive your dream car or bike with our attractive vehicle loans',
      rate: '9.5%',
      features: ['Up to 90% financing', 'Quick processing', 'Flexible EMI options'],
      icon: <Speed sx={{ fontSize: 40, color: '#020b43' }} />
    }
  ];

  const features = [
    {
      icon: <Security sx={{ fontSize: 50, color: '#020b43' }} />,
      title: 'Secure & Safe',
      description: 'Bank-grade security with 256-bit SSL encryption'
    },
    {
      icon: <Speed sx={{ fontSize: 50, color: '#020b43' }} />,
      title: 'Quick Approval',
      description: 'Get loan approval in as fast as 24 hours'
    },
    {
      icon: <Support sx={{ fontSize: 50, color: '#020b43' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 50, color: '#020b43' }} />,
      title: 'Easy Process',
      description: 'Simple online application with minimal documentation'
    }
  ];

  // const testimonials = [
  //   {
  //     name: 'Maria Ramos',
  //     role: 'Group Chair',
  //     rating: 5,
  //     comment: 'Excellent service! Got my home loan approved within 2 days. Highly recommended!',
  //     avatar: 'https://av.sc.com/corp-en/nr/content/images/SC_NewPeopleCards-Board_555x555_Maria-Ramos-768x768.jpg'
  //   },
  //   {
  //     name: 'Bill Winters',
  //     role: 'Chief Executive Officer',
  //     rating: 5,
  //     comment: 'Very smooth process and competitive rates. The team was very helpful throughout.',
  //     avatar: 'https://av.sc.com/corp-en/nr/content/images/SC_NewPeopleCards-MT_555x555_Bill3-1747985203-768x768.jpg'
  //   },
  //   {
  //     name: 'Diego De Giorgi',
  //     role: 'Chief Financial Officer',
  //     rating: 5,
  //     comment: 'Got my car loan approved instantly. Great experience with professional service.',
  //     avatar: 'https://av.sc.com/corp-en/nr/content/images/SC_NewPeopleCards-MT_555x555_DiegoDG-1747684714-768x768.jpg'
  //   }
  // ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#020b43' }}>
        Standard Chartered 
      </Typography>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Box 
            sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
            <Logo size="medium" showText={true} />
          </Box>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#020b43' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navigationItems.slice(0, -1).map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    color: '#000 !important',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': { color: '#000', fontWeight: 'bold' },             
                      }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ ml: 2, backgroundColor: '#0473ea', '&:hover': { backgroundColor: '#0473ea' } }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section with Sliding Images */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              {heroImages[currentSlide].title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              {heroImages[currentSlide].subtitle}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/register')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  backgroundColor: '#0473ea',
                  '&:hover': { backgroundColor: '#0473ea' }
                }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/loans')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 3
          }}
        >
          {heroImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
      </Box>

      {/*
        Loan Types Section (commented out as requested)
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
              Choose from our wide range of loan products designed to meet your specific financial needs
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: 480,
                      width: '100%',
                      maxWidth: 400,
                      mx: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 3 }}>
                          {loan.icon}
                        </Box>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                          {loan.title}
                        </Typography>
                        <Chip
                          label={`Starting from ${loan.rate} p.a.`}
                          color="primary"
                          sx={{ mb: 2, fontWeight: 'bold' }}
                        />
                        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                          {loan.description}
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                          {loan.features.map((feature, idx) => (
                            <Typography key={idx} variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <CheckCircle sx={{ fontSize: 16, color: '#4caf50', mr: 1 }} />
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/register')}
                        sx={{ py: 1.5, mt: 2 }}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      */}

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
              Why Choose Standard Chartered?
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
              We provide the best loan experience with cutting-edge technology and personalized service
            </Typography>
          </motion.div>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            px: 4,
            flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on mobile, single row on desktop
            gap: 4
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '0 0 auto' }, // Responsive flex behavior
                maxWidth: { xs: '100%', sm: '45%', md: 'none' }
              }}>
                <StandardCard 
                  variant="feature"
                  delay={index * 0.1}
                  elevation={2}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </StandardCard>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

   
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            What Our Customers Say
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: '#666', maxWidth: 600, mx: 'auto' }}>
            Don't just take our word for it - hear from our satisfied customers
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StandardCard 
                variant="testimonial"
                delay={index * 0.2}
                elevation={3}
                sx={{ 
                  minHeight: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  "{testimonial.comment}"
                </Typography>
              </StandardCard>
            </Grid>
          ))}
        </Grid>
      </Container>  */}

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: '#1e2a5e',
          color: 'white',
          py: 8,
          backgroundImage: 'linear-gradient(135deg, #bababaff 0%, #bababaff 100%)'
        }}
      >
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
                  Ready to Get Started?
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Apply for your loan today and get instant approval with competitive rates
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#0473ea',
                    px: 4,
                    py: 2,
                    fontSize: '1.2rem',
                    '&:hover': { backgroundColor: '#0473ea' }
                  }}
                >
                  Apply Now
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#020b43', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
                Standard Chartered Bank
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Your trusted partner for all loan requirements. We provide quick, secure, and hassle-free loan solutions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {navigationItems.slice(0, -1).map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{ justifyContent: 'flex-start', p: 0, textTransform: 'none' }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">+91 98765 43210</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">info@sc.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2">Bangalore, Karnataka, India</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © 2025 Standard Chartered Bank. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default NewLandingPage;