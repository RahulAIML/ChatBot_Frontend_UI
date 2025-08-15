import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: '/api', // This will be proxied through Vite's dev server
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Sending request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for debugging
    console.error('Axios response error:', error);
    
    // Return the original error to preserve all error details
    // The error handling in the component will handle the response
    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: 'ask/',
  hello: 'hello/',
  kanban: 'kanban',
  calendar: 'calendar',
  auth: {
    me: 'auth/me',
    signIn: 'auth/sign-in',
    signUp: 'auth/sign-up',
  },
  mail: {
    list: 'mail/list',
    details: 'mail/details',
    labels: 'mail/labels',
  },
  post: {
    list: 'post/list',
    details: 'post/details',
    latest: 'post/latest',
    search: 'post/search',
  },
  product: {
    list: 'product/list',
    details: 'product/details',
    search: 'product/search',
  },
};
