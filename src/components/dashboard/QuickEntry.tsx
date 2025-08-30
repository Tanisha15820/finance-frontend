import React, { useState } from 'react';
import { Zap, Check, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTransactions } from '../../hooks/useTransactions';
import { ParsedTransaction } from '../../types';

export const QuickEntry: React.FC = () => {
  const [input, setInput] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedTransaction | null>(null);
  const { parseTransaction, addTransaction } = useTransactions();

  const handleParse = async () => {
    if (!input.trim()) return;
    
    setParsing(true);
    try {
      const result = await parseTransaction(input);
      setParsedData(result);
    } catch (error) {
      console.error('Parsing failed:', error);
    } finally {
      setParsing(false);
    }
  };

  const handleConfirm = () => {
    if (parsedData) {
      addTransaction(parsedData);
      setInput('');
      setParsedData(null);
    }
  };

  const handleReject = () => {
    setParsedData(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Entry
          </h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Try: 'Coffee at Starbucks $6.50' or 'Monthly salary $4500'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !parsing && handleParse()}
          />
          <Button
            onClick={handleParse}
            disabled={!input.trim() || parsing}
            loading={parsing}
            className="w-full"
          >
            Parse with AI
          </Button>
        </div>

        {parsedData && (
          <div className="border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-emerald-900 dark:text-emerald-100">
                Parsed Transaction
              </h3>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  parsedData.confidence >= 0.8 ? 'bg-emerald-500' :
                  parsedData.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs text-emerald-700 dark:text-emerald-300">
                  {Math.round(parsedData.confidence * 100)}% confidence
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Amount</p>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  {formatCurrency(parsedData.amount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Type</p>
                <p className="font-medium text-emerald-900 dark:text-emerald-100 capitalize">
                  {parsedData.type}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Category</p>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  {parsedData.category}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">Description</p>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  {parsedData.description}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleConfirm} size="sm" className="flex-1">
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </Button>
              <Button onClick={handleReject} variant="outline" size="sm" className="flex-1">
                <X className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">💡 Try these examples:</p>
          <ul className="space-y-1">
            <li>"Coffee at Starbucks $6.50"</li>
            <li>"Gas station $40"</li>
            <li>"Amazon purchase $89.99"</li>
            <li>"Monthly salary $4500"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};