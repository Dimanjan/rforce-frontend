import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data.results;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured/');
  return response.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/products/categories/');
  return response.data;
};

export default api;

// Add these to lib/api.ts
export const getProductReviews = async (productId: number) => {
    const response = await api.get(`/reviews/?product=${productId}`);
    return response.data.results;
  };
  
  export const createReview = async (reviewData: { product: number; rating: number; comment: string }) => {
    const response = await api.post('/reviews/', reviewData);
    return response.data;
  };

// Add this to lib/api.ts
export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders/', orderData);
    return response.data;
  };
  
  export const getOrders = async () => {
    const response = await api.get('/orders/');
    return response.data.results;
  };