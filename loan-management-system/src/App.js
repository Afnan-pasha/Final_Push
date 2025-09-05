import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// Context Providers
import { AuthProvider } from './context/AuthContext';
import { LoanProvider } from './context/LoanContext';

// Layout Components
import Layout from './components/layout/Layout';
import PublicLayout from './components/layout/PublicLayout';

// Pages
import NewLandingPage from './pages/NewLandingPage';
import About from './pages/About';
import Loans from './pages/Loans';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ApplyLoan from './pages/customer/ApplyLoan';
import LoanStatus from './pages/customer/LoanStatus';
import Notifications from './pages/customer/Notifications';

// Maker Pages
import MakerDashboard from './pages/maker/MakerDashboard';
import LoanApplications from './pages/maker/LoanApplications';
import ApplicationReview from './pages/maker/ApplicationReview';
import MakerReports from './pages/maker/Reports';
import MakerNotifications from './pages/maker/Notifications';

// Checker Pages
import CheckerDashboard from './pages/checker/CheckerDashboard';
import CheckerApplications from './pages/checker/CheckerApplications';
import CheckerReview from './pages/checker/CheckerReview';
import CheckerReports from './pages/checker/Reports';
import CheckerNotifications from './pages/checker/Notifications';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

// Profile Page
import Profile from './pages/Profile';

// 404 Page
import NotFound from './pages/NotFound';

// Theme Configuration - Standard Chartered Brand Colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#020b43', // Dark Navy Blue (global blue tone)
      light: '#1e2a5e',
      dark: '#0a112d',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0473ea', // Bright Blue for buttons and accents
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#1565c0' }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LoanProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/loans" element={<PublicLayout><Loans /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Customer Routes */}
                <Route path="/customer" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <CustomerDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/customer/dashboard" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <CustomerDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/customer/apply-loan" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <ApplyLoan />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/customer/loan-status" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <LoanStatus />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/customer/notifications" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <Notifications />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/customer/profile" element={
                  <ProtectedRoute role="customer">
                    <Layout userType="customer">
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Maker Routes */}
                <Route path="/maker" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <MakerDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/maker/applications" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <LoanApplications />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/maker/review/:applicationId" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <ApplicationReview />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/maker/notifications" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <MakerNotifications />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/maker/profile" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/maker/reports" element={
                  <ProtectedRoute role="maker">
                    <Layout userType="maker">
                      <MakerReports />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Checker Routes */}
                <Route path="/checker" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <CheckerDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/checker/applications" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <CheckerApplications />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/checker/review/:applicationId" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <CheckerReview />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/checker/notifications" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <CheckerNotifications />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/checker/profile" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/checker/reports" element={
                  <ProtectedRoute role="checker">
                    <Layout userType="checker">
                      <CheckerReports />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* 404 Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </LoanProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;