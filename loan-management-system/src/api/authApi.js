// API layer for auth endpoints using axios
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

// -----------------
// Auth endpoints
// -----------------
export async function registerApi({ email, password, role, name, phone }) {
  try {
    const res = await api.post('/api/auth/register', {
      email,
      password,
      role,
      name,
      phone,
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Registration failed');
  }
}

export async function meApi({ email, password }) {
  try {
    // Use axios built-in Basic Auth support
    const res = await api.get('/api/auth/me', {
      auth: { username: email, password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Unauthorized');
  }
}

export async function updateProfileApi({ email, name, phone }, auth) {
  try {
    const res = await api.put('/api/auth/profile', { email, name, phone }, {
      auth: { username: auth.email, password: auth.password },
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to update profile');
  }
}

export async function changePasswordApi({ currentPassword, newPassword }, auth) {
  try {
    const res = await api.post('/api/auth/change-password', { currentPassword, newPassword }, {
      auth: { username: auth.email, password: auth.password },
      responseType: 'text'
    });
    return res.data;
  } catch (err) {
    throw toError(err, 'Failed to change password');
  }
}

export async function forgotPasswordApi(email) {
  try {
    const res = await api.post(
      '/api/auth/forgot-password',
      { email },
      { responseType: 'text' }
    );
    return res.data; // string message
  } catch (err) {
    throw toError(err, 'Failed to send reset link');
  }
}

export async function resetPasswordApi({ token, newPassword }) {
  try {
    const res = await api.post(
      '/api/auth/reset-password',
      { token, newPassword },
      { responseType: 'text' }
    );
    return res.data; // string message
  } catch (err) {
    throw toError(err, 'Failed to reset password');
  }
}
