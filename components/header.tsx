'use client';

import { useSelector } from 'react-redux';
import { Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { AuthButton } from './auth-button';
import { RootState } from '../store/provider';

export function Header() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ArkLab AI</h1>
              <p className="text-sm text-gray-600">Agent Catalog</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && user && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}