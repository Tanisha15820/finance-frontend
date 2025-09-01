// API utility functions for backend communication


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';


// Helper function to get JWT token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
  
};

// Generic API call function
export const apiCall = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  login: (email: string, password: string) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  
  register: (email: string, password: string, name: string) => 
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),
  
  getMe: () => apiCall('/auth/me'),
  
  getStatus: () => apiCall('/auth/status'),
  
  logout: () => apiCall('/auth/logout', { method: 'POST' })
};

// Transaction API calls
export const transactionAPI = {
  getAll: (filters?: {
    category?: string;
    type?: 'income' | 'expense';
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    const queryString = params.toString();
    return apiCall(`/transactions${queryString ? `?${queryString}` : ''}`);
  },
  
  parse: (input: string) => 
    apiCall('/transactions/parse', {
      method: 'POST',
      body: JSON.stringify({ input })
    }),
  
  create: (transaction: {
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date?: string;
    confidence?: number;
  }) => 
    apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction)
    }),
  
  update: (id: string, transaction: {
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date?: string;
  }) => 
    apiCall(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction)
    }),
  
  delete: (id: string) => 
    apiCall(`/transactions/${id}`, { method: 'DELETE' }),
  
  getCategories: () => apiCall('/transactions/categories')
};

// Analytics API calls
export const analyticsAPI = {
  getSummary: () => apiCall('/analytics/summary'),
  
  getCategories: (period: 'month' | 'quarter' | 'year' = 'month') => 
    apiCall(`/analytics/categories?period=${period}`),
  
  getTrends: (days: number = 30) => 
    apiCall(`/analytics/trends?days=${days}`),
  
  getMonthlyComparison: () => apiCall('/analytics/monthly-comparison')
};

// Health check
export const healthCheck = () => 
  fetch(`${API_BASE_URL.replace('/api', '')}/health`).then(res => res.json());

export default {
  auth: authAPI,
  transactions: transactionAPI,
  analytics: analyticsAPI,
  healthCheck
};
