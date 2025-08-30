import React from 'react';
import { AuthForms } from './AuthForms';
import { TrendingUp, Shield, Zap } from 'lucide-react';

export const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Finance Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Smart financial management with AI-powered insights
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 lg:justify-start justify-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered Parsing</h3>
                <p className="text-gray-600 dark:text-gray-400">Natural language transaction entry</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 lg:justify-start justify-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">Smart Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">Detailed insights and trends</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 lg:justify-start justify-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400">Your data is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Forms */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <AuthForms />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
