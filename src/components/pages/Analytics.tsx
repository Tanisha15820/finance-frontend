import React from 'react';
import { SpendingChart } from '../analytics/SpendingChart';
import { TrendsChart } from '../analytics/TrendsChart';
import { SummaryCards } from '../dashboard/SummaryCards';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { useTransactions } from '../../hooks/useTransactions';
import { useAnalytics } from '../../hooks/useAnalytics';

export const Analytics: React.FC = () => {
  const { transactions } = useTransactions();
  const { summary, categoryData, trendData, loading } = useAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed insights into your financial patterns and trends.
        </p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SpendingChart data={categoryData} />
        <TrendsChart data={trendData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Categories
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.slice(0, 5).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(category.amount)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transaction Summary
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Total Transactions</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {transactions.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Income Transactions</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {transactions.filter(t => t.type === 'income').length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Expense Transactions</span>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {transactions.filter(t => t.type === 'expense').length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Average Transaction</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {transactions.length > 0 
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(
                        transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
                      )
                    : '$0.00'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};