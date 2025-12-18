import api from './api';
import { LoginCredentials, RegisterData } from '@/types';

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login/', credentials);
  const { access } = response.data;
  setAuthToken(access);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register/', data);
  const { access } = response.data;
  setAuthToken(access);
  return response.data;
};

export const logout = async () => {
  // In simple JWT setups, you can just clear the local token
  setAuthToken(null);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await api.get('/auth/user/');
    return response.data;
  } catch (error) {
    setAuthToken(null);
    return null;
  }
};