import { Metadata } from 'next';
import { AuthButton } from '../../components/auth-button';
import { Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authentication - ArkLab AI',
  description: 'Sign in to access the ArkLab AI Agent Catalog',
};

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ArkLab AI</h1>
          <p className="text-gray-600">
            Sign in to access our comprehensive AI agent catalog and discover powerful automation solutions.
          </p>
        </div>
        
        <div className="space-y-4">
          <AuthButton />
          
          <div className="text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}