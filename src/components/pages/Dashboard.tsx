import React, { useState } from 'react';
import { SummaryCards } from '../dashboard/SummaryCards';
import { QuickEntry } from '../dashboard/QuickEntry';
import { RecentTransactions } from '../dashboard/RecentTransactions';
import { SpendingChart } from '../analytics/SpendingChart';
import { TransactionModal } from '../transactions/TransactionModal';
import { useTransactions } from '../../hooks/useTransactions';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Transaction } from '../../types';

export const Dashboard: React.FC = () => {
  const { transactions, updateTransaction, deleteTransaction, categories, refreshTransactions } = useTransactions();
  const { summary, categoryData, refreshAnalytics } = useAnalytics();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (data: Partial<Transaction>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    }
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your finances today.
        </p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickEntry />
        </div>
        <div>
          <SpendingChart data={categoryData} />
        </div>
      </div>

      <RecentTransactions
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        transaction={editingTransaction || undefined}
        onSave={handleSaveTransaction}
        categories={categories}
      />
    </div>
  );
};