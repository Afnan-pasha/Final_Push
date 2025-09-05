import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Persist last used Basic credentials locally for profile actions
  const setCredentials = (email, password) => {
    if (email && password) {
      localStorage.setItem('basic_email', email);
      localStorage.setItem('basic_password', password);
    }
  };

  const getCredentials = () => {
    const email = localStorage.getItem('basic_email');
    const password = localStorage.getItem('basic_password');
    return email && password ? { email, password } : null;
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userData && token) {
          const user = JSON.parse(userData);
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: user,
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      // Call backend with Basic Auth and fetch current user
      const { meApi } = await import('../api/authApi');
      const user = await meApi({ email: credentials.email, password: credentials.password });

      // Optional: enforce role selection matches backend role
      if (credentials.selectedRole) {
        const selected = credentials.selectedRole.toUpperCase();
        if (user.role !== selected && user.role !== `ROLE_${selected}`) {
          throw new Error(`Access denied. Your account role is ${user.role}, but you selected ${credentials.selectedRole}.`);
        }
      }

      // Persist user details received from backend
      const normalizedUser = {
        id: user.id,
        email: user.email,
        role: (user.role || '').toString().toLowerCase(),
        name: user.name || '',
        phone: user.phone || '',
        createdAt: user.createdAt || Date.now(),
      };
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      // Store a basic marker since Basic Auth is per-request
      localStorage.setItem('token', 'basic');

      // Save credentials for subsequent profile actions
      setCredentials(credentials.email, credentials.password);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: normalizedUser });
      return { success: true, user: normalizedUser };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('basic_email');
    localStorage.removeItem('basic_password');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Register function (calls backend)
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const { registerApi } = await import('../api/authApi');
      const created = await registerApi({
        email: userData.email,
        password: userData.password,
        role: 'CUSTOMER',
        name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
        phone: userData.phone || ''
      });
      const normalizedUser = {
        id: created.id,
        email: created.email,
        role: (created.role || '').toString().toLowerCase(),
        name: created.name || '',
        phone: created.phone || ''
      };
      // Do not auto-login with Basic password; user should login explicitly
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return { success: true, user: normalizedUser };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Update profile
  const updateProfile = async (updates) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const { updateProfileApi } = await import('../api/authApi');
      const creds = getCredentials();
      if (!creds) throw new Error('Please re-login to update profile');
      const updated = await updateProfileApi({
        email: updates.email,
        name: updates.name,
        phone: updates.phone,
      }, creds);

      const normalizedUser = {
        id: updated.id,
        email: updated.email,
        role: (updated.role || '').toString().toLowerCase(),
        name: updated.name || '',
        phone: updated.phone || '',
        createdAt: state.user?.createdAt || Date.now(),
      };
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: normalizedUser });
      return { success: true, user: normalizedUser };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const { changePasswordApi } = await import('../api/authApi');
      const creds = getCredentials();
      if (!creds) throw new Error('Please re-login to change password');
      await changePasswordApi({ currentPassword, newPassword }, creds);
      // update stored password so further actions work without relogin
      setCredentials(creds.email, newPassword);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return { success: false, error: error.message };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;