import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userEmail, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LogoIcon className="h-8 w-8 text-brand-primary" />
            <h1 className="ml-3 text-2xl font-bold text-slate-900">NeuroScribe AI</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-slate-500" />
                <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:block">{userEmail}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors duration-200"
                aria-label="Logout"
              >
                <LogoutIcon className="h-5 w-5" />
                <span className="ml-1.5 hidden sm:block">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;