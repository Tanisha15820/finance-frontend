import { useState, useEffect, useCallback } from 'react';
import { AnalyticsSummary, CategoryData, TrendData } from '../types';
import { analyticsAPI } from '../utils/api';

export const useAnalytics = () => {
  const [summary, setSummary] = useState<AnalyticsSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    monthlyChange: 0
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);

  // Load analytics summary from backend
  const loadSummary = useCallback(async () => {
    try {
      const data = await analyticsAPI.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to load analytics summary:', error);
    }
  }, []);

  // Load category analytics from backend
  const loadCategoryData = useCallback(async (period: 'month' | 'quarter' | 'year' = 'month') => {
    try {
      const data = await analyticsAPI.getCategories(period);
      setCategoryData(data);
    } catch (error) {
      console.error('Failed to load category analytics:', error);
    }
  }, []);

  // Load trend data from backend
  const loadTrendData = useCallback(async (days: number = 30) => {
    try {
      const data = await analyticsAPI.getTrends(days);
      setTrendData(data);
    } catch (error) {
      console.error('Failed to load trend analytics:', error);
    }
  }, []);

  // Load all analytics data
  const loadAnalytics = useCallback(async (options?: {
    period?: 'month' | 'quarter' | 'year';
    trendDays?: number;
  }) => {
    setLoading(true);
    try {
      await Promise.all([
        loadSummary(),
        loadCategoryData(options?.period),
        loadTrendData(options?.trendDays)
      ]);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [loadSummary, loadCategoryData, loadTrendData]);

  // Initial load when user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      loadAnalytics();
    }
  }, [loadAnalytics]);

  // Refresh analytics data
  const refreshAnalytics = (options?: {
    period?: 'month' | 'quarter' | 'year';
    trendDays?: number;
  }) => {
    loadAnalytics(options);
  };

  return {
    summary,
    categoryData,
    trendData,
    loading,
    refreshAnalytics,
    loadSummary,
    loadCategoryData,
    loadTrendData
  };
};
