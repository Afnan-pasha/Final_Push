import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const PublicNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.label} 
            button 
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              backgroundColor: 'transparent',
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{ 
                textAlign: 'center',
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
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
              sx={{ color: '#1e2a5e' }}
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
                    color: '#333', 
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    fontSize: '1rem',
                    borderBottom: 'none',
                    '&:hover': { color: '#333', fontWeight: 'bold' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default PublicNavigation;