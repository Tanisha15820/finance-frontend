import React, { useState } from 'react';
import { TransactionList } from '../transactions/TransactionList';
import { TransactionModal } from '../transactions/TransactionModal';
import { useTransactions } from '../../hooks/useTransactions';
import { Transaction } from '../../types';

export const Transactions: React.FC = () => {
  const { 
    transactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction, 
    categories 
  } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (data: Partial<Transaction>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction({
        ...data,
        confidence: 1.0
      } as any);
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
          Transactions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your financial transactions in one place.
        </p>
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        onAdd={handleAddTransaction}
        categories={categories}
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