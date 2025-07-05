// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500';

export const API_ENDPOINTS = {
  // Authentication endpoints
  VOLUNTEER_LOGIN: `${API_BASE_URL}/api/auth/volunteer-login`,
  VOLUNTEER_REGISTER: `${API_BASE_URL}/api/auth/registerVolunteer`,
  USER_LOGIN: `${API_BASE_URL}/api/auth/user-login`,
  USER_REGISTER: `${API_BASE_URL}/api/generaluser/register`,
  ORGANIZATION_LOGIN: `${API_BASE_URL}/api/auth/organization-login`,
  ORGANIZATION_REGISTER: `${API_BASE_URL}/api/organization/register`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/auth/admin-login`,
  ADMIN_REGISTER: `${API_BASE_URL}/api/admin/register`,
  
  // Profile endpoints
  VOLUNTEER_PROFILE: `${API_BASE_URL}/api/Volunteer/profile`,
  USER_PROFILE: `${API_BASE_URL}/api/generaluser/profile`,
  ORGANIZATION_PROFILE: `${API_BASE_URL}/api/organization/profile`,
  
  // Other endpoints can be added here
};

// Common API request configuration
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// API helper functions
export const apiRequest = async (url, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      ...API_CONFIG.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...API_CONFIG,
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth utilities
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};