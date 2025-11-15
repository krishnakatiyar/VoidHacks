import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userEmail?: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated, userEmail, onLogout }) => {
  return (
    <div className="min-h-screen bg-brand-light text-text-primary flex flex-col">
      <Header isAuthenticated={isAuthenticated} userEmail={userEmail} onLogout={onLogout} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;