export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParsedTransaction {
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  confidence: number;
}

export interface AnalyticsSummary {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  monthlyChange: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface TrendData {
  date: string;
  income: number;
  expenses: number;
  net: number;
}

export type Theme = 'light' | 'dark' | 'system';