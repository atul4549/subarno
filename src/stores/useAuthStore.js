import { create } from 'zustand';
// import axios from 'axios';
import toast from 'react-hot-toast';

import axiosInstance  from "../lib/axios";

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true
// });

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  tempEmail: null,

  // Add this function
  // checkAuth: async () => {
  //   const token = localStorage.getItem('token');
    
  //   // If no token exists, user is not authenticated
  //   if (!token) {
  //     set({ user: null, token: null, isAuthenticated: false });
  //     return { success: false, message: 'No token found' };
  //   }

  //   set({ loading: true });
    
  //   try {
  //     // Verify token with backend
  //     const response = await axiosInstance.get('/auth/verify', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(response)
  //     // If token is valid, update user data
  //     const { user } = response.data;
  //     set({ 
  //       user, 
  //       token, 
  //       isAuthenticated: true, 
  //       loading: false 
  //     });
      
  //     return { success: true, user };
  //   } catch (error) {
  //     // If token is invalid or expired, clear storage
  //     // localStorage.removeItem('token');
  //     // delete axiosInstance.defaults.headers.common['Authorization'];
      
  //     set({ 
  //       user: null, 
  //       token: null, 
  //       isAuthenticated: false, 
  //       loading: false 
  //     });
      
  //     return { 
  //       success: false, 
  //       message: error.response?.data?.message || 'Authentication failed' 
  //     };
  //   }
  // },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/verify");
// console.log(res)
      set({ authUser: res.data , user: res.data});
      // get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  register: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      set({ tempEmail: userData.email, loading: false });
      toast.success(response.data.message);
      return { success: true, userId: response.data.userId };
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false };
    }
  },

  verifyOTP: async (email, otp) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, token, isAuthenticated: true, loading: false, tempEmail: null });
      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Verification failed');
      return { success: false };
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, token, isAuthenticated: true, loading: false });
      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false };
    }
  },

  resendOTP: async (email) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/resend-otp', { email });
      set({ loading: false });
      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ user: null, token: null, isAuthenticated: false, tempEmail: null });
    toast.success('Logged out successfully');
  }
}));

// Set initial token
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// export default useAuthStore;