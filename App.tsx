
import React, { useState, useCallback, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Mock check for existing session
    const loggedInUser = sessionStorage.getItem('neuroscribe-user');
    if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = useCallback((email: string) => {
    const userData = { email };
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('neuroscribe-user', JSON.stringify(userData));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('neuroscribe-user');
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated} userEmail={user?.email} onLogout={handleLogout}>
      {isAuthenticated && user ? (
        <Dashboard />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </Layout>
  );
};

export default App;
