import { useState, useEffect, useCallback } from 'react';
import { Transaction, ParsedTransaction } from '../types';
import { transactionAPI } from '../utils/api';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Income',
  'Groceries',
  'Travel',
  'Other'
];

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>(CATEGORIES);

  // Load transactions from backend
  const loadTransactions = useCallback(async (filters?: {
    category?: string;
    type?: 'income' | 'expense';
    startDate?: string;
    endDate?: string;
  }) => {
    setLoading(true);
    try {
      const data = await transactionAPI.getAll(filters);
      const formattedTransactions = data.map((t: any) => ({
        ...t,
        date: new Date(t.date),
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt)
      }));
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load categories from backend
  const loadCategories = useCallback(async () => {
    try {
      const data = await transactionAPI.getCategories();
      setCategories(data.map((cat: any) => cat.name));
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Keep default categories as fallback
    }
  }, []);

  // Initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      loadTransactions();
      loadCategories();
    }
  }, [loadTransactions, loadCategories]);

  const parseTransaction = async (input: string): Promise<ParsedTransaction> => {
    setLoading(true);
    try {
      const parsedData = await transactionAPI.parse(input);
      return parsedData;
    } catch (error) {
      console.error('Failed to parse transaction:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (parsedData: ParsedTransaction) => {
    setLoading(true);
    try {
      const newTransaction = await transactionAPI.create({
        ...parsedData,
        date: new Date().toISOString()
      });
      
      // Add to local state
      const formattedTransaction = {
        ...newTransaction,
        date: new Date(newTransaction.date),
        createdAt: new Date(newTransaction.createdAt),
        updatedAt: new Date(newTransaction.updatedAt)
      };
      
      setTransactions(prev => [formattedTransaction, ...prev]);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    setLoading(true);
    try {
      const updatedTransaction = await transactionAPI.update(id, {
        amount: updates.amount!,
        description: updates.description!,
        category: updates.category!,
        type: updates.type!,
        date: updates.date?.toISOString()
      });
      
      // Update local state
      setTransactions(prev => prev.map(t => 
        t.id === id 
          ? {
              ...updatedTransaction,
              date: new Date(updatedTransaction.date),
              createdAt: new Date(updatedTransaction.createdAt),
              updatedAt: new Date(updatedTransaction.updatedAt)
            }
          : t
      ));
    } catch (error) {
      console.error('Failed to update transaction:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    setLoading(true);
    try {
      await transactionAPI.delete(id);
      
      // Remove from local state
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTransactions = (filters: { 
    category?: string; 
    type?: 'income' | 'expense'; 
    dateRange?: { start: Date; end: Date } 
  }) => {
    return transactions.filter(t => {
      if (filters.category && t.category !== filters.category) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.dateRange) {
        const transactionDate = new Date(t.date);
        if (transactionDate < filters.dateRange.start || transactionDate > filters.dateRange.end) {
          return false;
        }
      }
      return true;
    });
  };

  const refreshTransactions = () => {
    loadTransactions();
  };

  return {
    transactions,
    loading,
    parseTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    refreshTransactions,
    categories
  };
};
