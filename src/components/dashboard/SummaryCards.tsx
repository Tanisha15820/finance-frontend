import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { AnalyticsSummary } from '../../types';

interface SummaryCardsProps {
  summary: AnalyticsSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Net Savings',
      value: summary.savings,
      icon: PiggyBank,
      color: summary.savings >= 0 ? 'text-emerald-600' : 'text-red-600',
      bgColor: summary.savings >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Monthly Change',
      value: summary.monthlyChange,
      icon: summary.monthlyChange >= 0 ? TrendingUp : TrendingDown,
      color: summary.monthlyChange >= 0 ? 'text-emerald-600' : 'text-red-600',
      bgColor: summary.monthlyChange >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20',
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} hover className="transform hover:scale-105 transition-transform duration-200">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.isPercentage 
                      ? `${card.value >= 0 ? '+' : ''}${card.value.toFixed(1)}%`
                      : formatCurrency(card.value)
                    }
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};