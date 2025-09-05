// API layer for customer endpoints using axios
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

// Axios instance with shared config
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Normalize axios errors to clean messages
const toError = (err, fallback) => {
  const message =
    err?.response?.data?.message ||
    (typeof err?.response?.data === 'string' ? err.response.data : null) ||
    err?.message ||
    fallback ||
    'Request failed';
  return new Error(message);
};

// Helper function to get stored credentials
const getStoredCredentials = () => {
  const email = localStorage.getItem('basic_email');
  const password = localStorage.getItem('basic_password');
  return email && password ? { email, password } : null;
};

// -----------------
// Dashboard API
// -----------------
export async function getDashboardData() {
  try {
    const creds = getStoredCredentials();
    if (!creds) throw new Error('Authentication required. Please login again.');
    
    const res = await api.get('/api/dashboard', {
      auth: { username: creds.email, password: creds.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch dashboard data');
  }
}

// -----------------
// Loans API
// -----------------
export async function submitLoanApplication(applicationData) {
  try {
    const creds = getStoredCredentials();
    if (!creds) throw new Error('Authentication required. Please login again.');
    
    // Convert FormData to JSON object for backend compatibility
    let jsonData = {};
    if (applicationData instanceof FormData) {
      for (let [key, value] of applicationData.entries()) {
        jsonData[key] = value;
      }
    } else {
      jsonData = applicationData;
    }
    
    // Map frontend fields to backend expected format
    const backendRequest = {
      loanType: jsonData.loanType,
      loanAmount: parseFloat(jsonData.loanAmount),
      interestRate: parseFloat(jsonData.interestRate || 8.5), // Default rate if not provided
      loanTermMonths: parseInt(jsonData.loanDuration), // Frontend uses loanDuration
      purpose: jsonData.loanPurpose, // Frontend uses loanPurpose
      collateral: jsonData.collateral || null
    };
    
    // Log the request data for debugging
    console.log('Submitting loan application with data:', backendRequest);
    console.log('Authentication:', { email: creds.email });
    
    const res = await api.post('/api/loans/apply', backendRequest, {
      auth: { username: creds.email, password: creds.password },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Loan submission error details:', {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      message: err.message
    });
    throw toError(err, 'Failed to submit loan application');
  }
}

export async function getLoanApplications(filters = {}) {
  try {
    const creds = getStoredCredentials();
    if (!creds) throw new Error('Authentication required. Please login again.');
    
    const params = new URLSearchParams();
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.status) params.append('status', filters.status);
    if (filters.loanType) params.append('loanType', filters.loanType);

    const res = await api.get(`/api/loans?${params.toString()}`, {
      auth: { username: creds.email, password: creds.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch loan applications');
  }
}

export async function getLoanApplicationById(applicationId, auth) {
  try {
    const res = await api.get(`/api/loans/${applicationId}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch loan application details');
  }
}

// -----------------
// Existing Loans API
// -----------------
export async function getExistingLoans(auth, filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.status) params.append('status', filters.status);

    const res = await api.get(`/api/existing-loans?${params.toString()}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch existing loans');
  }
}

export async function getExistingLoanById(loanId, auth) {
  try {
    const res = await api.get(`/api/existing-loans/${loanId}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch existing loan details');
  }
}

// -----------------
// Notifications API
// -----------------
export async function getNotifications(filters = {}) {
  try {
    const creds = getStoredCredentials();
    if (!creds) throw new Error('Authentication required. Please login again.');
    
    const params = new URLSearchParams();
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.read !== undefined) params.append('read', filters.read);
    if (filters.type) params.append('type', filters.type);

    const res = await api.get(`/api/notifications?${params.toString()}`, {
      auth: { username: creds.email, password: creds.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch notifications');
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const creds = getStoredCredentials();
    if (!creds) throw new Error('Authentication required. Please login again.');
    
    const res = await api.put(`/api/notifications/${notificationId}/read`, {}, {
      auth: { username: creds.email, password: creds.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to mark notification as read');
  }
}

export async function markAllNotificationsAsRead(auth) {
  try {
    const res = await api.put('/api/notifications/read-all', {}, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to mark all notifications as read');
  }
}

// -----------------
// Documents API
// -----------------
export async function uploadDocument(formData, auth) {
  try {
    const res = await api.post('/api/documents', formData, {
      auth: { username: auth.email, password: auth.password },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to upload document');
  }
}

export async function getDocuments(auth, filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.applicationId) params.append('applicationId', filters.applicationId);
    if (filters.documentType) params.append('documentType', filters.documentType);
    if (filters.userId) params.append('userId', filters.userId);

    const res = await api.get(`/api/documents?${params.toString()}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch documents');
  }
}

export async function downloadDocument(documentId, auth) {
  try {
    const res = await api.get(`/api/documents/${documentId}/download`, {
      auth: { username: auth.email, password: auth.password },
      responseType: 'blob',
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to download document');
  }
}

export async function deleteDocument(documentId, auth) {
  try {
    const res = await api.delete(`/api/documents/${documentId}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to delete document');
  }
}

// -----------------
// References API
// -----------------
export async function submitReferences(referencesData, auth) {
  try {
    const res = await api.post('/api/references', referencesData, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to submit references');
  }
}

export async function getReferences(auth, filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.applicationId) params.append('applicationId', filters.applicationId);
    if (filters.userId) params.append('userId', filters.userId);

    const res = await api.get(`/api/references?${params.toString()}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to fetch references');
  }
}

export async function updateReference(referenceId, referenceData, auth) {
  try {
    const res = await api.put(`/api/references/${referenceId}`, referenceData, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to update reference');
  }
}

export async function deleteReference(referenceId, auth) {
  try {
    const res = await api.delete(`/api/references/${referenceId}`, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to delete reference');
  }
}

// -----------------
// Utility Functions
// -----------------
export const formatApiError = (error) => {
  if (error.response?.status === 401) {
    return 'Authentication failed. Please login again.';
  } else if (error.response?.status === 403) {
    return 'Access denied. You do not have permission to perform this action.';
  } else if (error.response?.status === 404) {
    return 'Resource not found.';
  } else if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }
  return error.message || 'An unexpected error occurred.';
};

export const createFormData = (data, fileFields = []) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (fileFields.includes(key) && data[key]) {
      if (Array.isArray(data[key])) {
        data[key].forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        formData.append(key, data[key]);
      }
    } else if (data[key] !== null && data[key] !== undefined) {
      if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  
  return formData;
};
