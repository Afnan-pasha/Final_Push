import React, { createContext, useContext, useReducer, useEffect } from 'react';

const LoanContext = createContext();

// Initial state
const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
  notifications: [],
};

// Action types
const LOAN_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Application actions
  CREATE_APPLICATION: 'CREATE_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  SET_APPLICATIONS: 'SET_APPLICATIONS',
  SET_CURRENT_APPLICATION: 'SET_CURRENT_APPLICATION',
  
  // Status actions
  APPROVE_BY_MAKER: 'APPROVE_BY_MAKER',
  REJECT_BY_MAKER: 'REJECT_BY_MAKER',
  FINAL_APPROVE: 'FINAL_APPROVE',
  FINAL_REJECT: 'FINAL_REJECT',
  
  // Notification actions
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
};

// Application statuses
const APPLICATION_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_MAKER_REVIEW: 'under_maker_review',
  MAKER_APPROVED: 'maker_approved',
  MAKER_REJECTED: 'maker_rejected',
  UNDER_CHECKER_REVIEW: 'under_checker_review',
  FINAL_APPROVED: 'final_approved',
  FINAL_REJECTED: 'final_rejected',
};

// Reducer
const loanReducer = (state, action) => {
  switch (action.type) {
    case LOAN_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOAN_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOAN_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOAN_ACTIONS.CREATE_APPLICATION:
      // Persist new application
      const createdApps = [...state.applications, action.payload];
      localStorage.setItem('loanApplications', JSON.stringify(createdApps));
      return {
        ...state,
        applications: createdApps,
        loading: false,
      };
    case LOAN_ACTIONS.UPDATE_APPLICATION:
      // Persist and update
      const updatedApps = state.applications.map(app =>
        app.id === action.payload.id ? action.payload : app
      );
      localStorage.setItem('loanApplications', JSON.stringify(updatedApps));
      return {
        ...state,
        applications: updatedApps,
        currentApplication: action.payload,
        loading: false,
      };
    case LOAN_ACTIONS.SET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        loading: false,
      };
    case LOAN_ACTIONS.SET_CURRENT_APPLICATION:
      return {
        ...state,
        currentApplication: action.payload,
        loading: false,
      };
    case LOAN_ACTIONS.ADD_NOTIFICATION:
      const newNotifs = [action.payload, ...state.notifications];
      localStorage.setItem('loanNotifications', JSON.stringify(newNotifs));
      return {
        ...state,
        notifications: newNotifs,
      };
    case LOAN_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case LOAN_ACTIONS.MARK_NOTIFICATION_READ:
      const readNotifs = state.notifications.map(notif =>
        notif.id === action.payload ? { ...notif, read: true } : notif
      );
      localStorage.setItem('loanNotifications', JSON.stringify(readNotifs));
      return {
        ...state,
        notifications: readNotifs,
      };
    default:
      return state;
  }
};

// Provider component
export const LoanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loanReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const applications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
        const notifications = JSON.parse(localStorage.getItem('loanNotifications') || '[]');
        
        dispatch({ type: LOAN_ACTIONS.SET_APPLICATIONS, payload: applications });
        dispatch({ type: LOAN_ACTIONS.SET_NOTIFICATIONS, payload: notifications });
      } catch (error) {
        console.error('Error loading loan data:', error);
      }
    };
    
    loadData();
  }, []);

  // Save to localStorage whenever applications or notifications change
  useEffect(() => {
    localStorage.setItem('loanApplications', JSON.stringify(state.applications));
  }, [state.applications]);

  useEffect(() => {
    localStorage.setItem('loanNotifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  // Mock CIBIL score generator
  const generateCibilScore = () => {
    return Math.floor(Math.random() * (850 - 300) + 300);
  };

  // Create notification
  const createNotification = (userId, title, message, type = 'info', applicationId = null) => {
    const notification = {
      id: Date.now() + Math.random(),
      userId,
      title,
      message,
      type, // 'info', 'success', 'warning', 'error'
      applicationId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    dispatch({ type: LOAN_ACTIONS.ADD_NOTIFICATION, payload: notification });
    return notification;
  };

  // Create application
  const createApplication = async (applicationData) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const application = {
        ...applicationData,
        id: 'APP' + Date.now(),
        status: APPLICATION_STATUS.SUBMITTED,
        submittedAt: new Date().toISOString(),
        cibilScore: generateCibilScore(),
        statusHistory: [
          {
            status: APPLICATION_STATUS.SUBMITTED,
            timestamp: new Date().toISOString(),
            comments: 'Application submitted by customer',
            updatedBy: applicationData.userId,
          }
        ],
        makerComments: '',
        checkerComments: '',
        documents: {
          personal: {
            photograph: applicationData.photograph,
            aadharCard: applicationData.aadharCard,
            panCard: applicationData.panCard,
            passport: applicationData.passport,
            drivingLicense: applicationData.drivingLicense,
            addressProof: applicationData.addressProof,
          },
          employment: {
            paySlips: applicationData.paySlips || [],
            itrDocuments: applicationData.itrDocuments || [],
            bankStatements: applicationData.bankStatements || [],
            employmentProof: applicationData.employmentProof,
            offerLetter: applicationData.offerLetter,
            idCard: applicationData.idCard,
            hrLetter: applicationData.hrLetter,
            businessProof: applicationData.businessProof,
            gstCertificate: applicationData.gstCertificate,
            businessLicense: applicationData.businessLicense,
            businessAddressProof: applicationData.businessAddressProof,
          },
          loan: {
            saleAgreement: applicationData.saleAgreement,
            ecDocument: applicationData.ecDocument,
            vehicleInvoice: applicationData.vehicleInvoice,
            vehicleQuotation: applicationData.vehicleQuotation,
          }
        }
      };
      
      dispatch({ type: LOAN_ACTIONS.CREATE_APPLICATION, payload: application });
      
      // Create notification for customer
      createNotification(
        applicationData.userId,
        'Application Submitted',
        `Your loan application ${application.id} has been submitted successfully and is under review.`,
        'success',
        application.id
      );
      
      // Create notification for makers (all makers will see this)
      createNotification(
        'all_makers',
        'New Application',
        `New loan application ${application.id} submitted by ${applicationData.firstName} ${applicationData.lastName}`,
        'info',
        application.id
      );
      
      return { success: true, application };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get applications (filtered by user role and ID)
  const getApplications = async (filters = {}) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Always read the full source of truth from localStorage to avoid stale/filtered state
      const allApps = JSON.parse(localStorage.getItem('loanApplications') || '[]');
      let filteredApplications = [...allApps];
      
      if (filters.userId) {
        filteredApplications = filteredApplications.filter(app => app.userId === filters.userId);
      }
      
      if (filters.status) {
        filteredApplications = filteredApplications.filter(app => app.status === filters.status);
      }
      
      if (filters.role === 'maker') {
        filteredApplications = filteredApplications.filter(app => 
          [APPLICATION_STATUS.SUBMITTED, APPLICATION_STATUS.UNDER_MAKER_REVIEW].includes(app.status)
        );
      }
      
      if (filters.role === 'checker') {
        filteredApplications = filteredApplications.filter(app => 
          [APPLICATION_STATUS.MAKER_APPROVED, APPLICATION_STATUS.UNDER_CHECKER_REVIEW].includes(app.status)
        );
      }
      
      // Keep state.applications as the full dataset; filtering is done in pages
      dispatch({ type: LOAN_ACTIONS.SET_APPLICATIONS, payload: allApps });
      return { success: true, applications: filteredApplications };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get single application
  const getApplication = async (applicationId) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const application = state.applications.find(app => app.id === applicationId);
      
      if (!application) {
        throw new Error('Application not found');
      }
      
      dispatch({ type: LOAN_ACTIONS.SET_CURRENT_APPLICATION, payload: application });
      return { success: true, application };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Maker approve application
  const approveByMaker = async (applicationId, comments) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const application = state.applications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const updatedApplication = {
        ...application,
        status: APPLICATION_STATUS.MAKER_APPROVED,
        makerComments: comments,
        makerApprovedAt: new Date().toISOString(),
        statusHistory: [
          ...application.statusHistory,
          {
            status: APPLICATION_STATUS.MAKER_APPROVED,
            timestamp: new Date().toISOString(),
            comments: comments,
            updatedBy: 'maker',
          }
        ]
      };
      
      // Persist to localStorage immediately so other role views see latest
      const allApps = JSON.parse(localStorage.getItem('loanApplications') || '[]');
      const persisted = allApps.map(a => a.id === updatedApplication.id ? updatedApplication : a);
      localStorage.setItem('loanApplications', JSON.stringify(persisted));
      
      dispatch({ type: LOAN_ACTIONS.UPDATE_APPLICATION, payload: updatedApplication });
      
      // Notify customer
      createNotification(
        application.userId,
        'Application Approved by Maker',
        `Your loan application ${applicationId} has been approved by the loan officer and forwarded to senior review.`,
        'success',
        applicationId
      );
      
      // Notify checkers
      createNotification(
        'all_checkers',
        'Application for Final Review',
        `Loan application ${applicationId} approved by maker and ready for final review.`,
        'info',
        applicationId
      );
      
      return { success: true, application: updatedApplication };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Maker reject application
  const rejectByMaker = async (applicationId, comments) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const application = state.applications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const updatedApplication = {
        ...application,
        status: APPLICATION_STATUS.MAKER_REJECTED,
        makerComments: comments,
        makerRejectedAt: new Date().toISOString(),
        statusHistory: [
          ...application.statusHistory,
          {
            status: APPLICATION_STATUS.MAKER_REJECTED,
            timestamp: new Date().toISOString(),
            comments: comments,
            updatedBy: 'maker',
          }
        ]
      };
      
      dispatch({ type: LOAN_ACTIONS.UPDATE_APPLICATION, payload: updatedApplication });
      
      // Notify customer
      createNotification(
        application.userId,
        'Application Rejected',
        `Your loan application ${applicationId} has been rejected by the loan officer. Reason: ${comments}`,
        'error',
        applicationId
      );
      
      return { success: true, application: updatedApplication };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Checker final approve
  const finalApprove = async (applicationId, comments) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const application = state.applications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const updatedApplication = {
        ...application,
        status: APPLICATION_STATUS.FINAL_APPROVED,
        checkerComments: comments,
        finalApprovedAt: new Date().toISOString(),
        statusHistory: [
          ...application.statusHistory,
          {
            status: APPLICATION_STATUS.FINAL_APPROVED,
            timestamp: new Date().toISOString(),
            comments: comments,
            updatedBy: 'checker',
          }
        ]
      };
      
      dispatch({ type: LOAN_ACTIONS.UPDATE_APPLICATION, payload: updatedApplication });
      
      // Notify customer
      createNotification(
        application.userId,
        'Loan Approved!',
        `Congratulations! Your loan application ${applicationId} has been approved. You will receive further instructions shortly.`,
        'success',
        applicationId
      );
      
      // Per requirements: no maker notification on final approval
      return { success: true, application: updatedApplication };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Checker final reject
  const finalReject = async (applicationId, comments) => {
    dispatch({ type: LOAN_ACTIONS.SET_LOADING, payload: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const application = state.applications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const updatedApplication = {
        ...application,
        status: APPLICATION_STATUS.FINAL_REJECTED,
        checkerComments: comments,
        finalRejectedAt: new Date().toISOString(),
        statusHistory: [
          ...application.statusHistory,
          {
            status: APPLICATION_STATUS.FINAL_REJECTED,
            timestamp: new Date().toISOString(),
            comments: comments,
            updatedBy: 'checker',
          }
        ]
      };
      
      dispatch({ type: LOAN_ACTIONS.UPDATE_APPLICATION, payload: updatedApplication });
      
      // Notify customer
      createNotification(
        application.userId,
        'Loan Application Rejected',
        `Your loan application ${applicationId} has been rejected after final review. Reason: ${comments}`,
        'error',
        applicationId
      );
      
      // Per requirements: no maker notification on final rejection
      return { success: true, application: updatedApplication };
    } catch (error) {
      dispatch({ type: LOAN_ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Get notifications for user
  // Filter notifications by role, per requirements
  // - Customer: only their own events (submitted, maker approved/rejected, final approved/rejected)
  // - Maker: only when customer submits a new application
  // - Checker: only when maker approves (ready for final review)
  const getNotifications = (userId, userRole) => {
    const all = state.notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (userRole === 'customer') {
      return all.filter(n => n.userId === userId);
    }
    if (userRole === 'maker') {
      return all.filter(n => n.userId === 'all_makers');
    }
    if (userRole === 'checker') {
      return all.filter(n => n.userId === 'all_checkers');
    }
    return [];
  };

  // Mark notification as read
  const markNotificationRead = (notificationId) => {
    dispatch({ type: LOAN_ACTIONS.MARK_NOTIFICATION_READ, payload: notificationId });
  };

  // Mark all notifications as read for a user/role view
  const markAllNotificationsRead = (userId, userRole) => {
    const toMark = getNotifications(userId, userRole).filter(n => !n.read);
    toMark.forEach(n => dispatch({ type: LOAN_ACTIONS.MARK_NOTIFICATION_READ, payload: n.id }));
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: LOAN_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    applications: state.applications,
    currentApplication: state.currentApplication,
    loading: state.loading,
    error: state.error,
    notifications: state.notifications,
    
    // Actions
    createApplication,
    getApplications,
    getApplication,
    approveByMaker,
    rejectByMaker,
    finalApprove,
    finalReject,
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearError,
    
    // Constants
    APPLICATION_STATUS,
  };

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  );
};

// Hook to use the loan context
export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};

export default LoanContext;