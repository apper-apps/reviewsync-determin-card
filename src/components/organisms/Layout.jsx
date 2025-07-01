import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function Layout({ children }) {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigationItems = [
    { path: '/', label: 'Search', icon: 'Search' },
    { path: '/dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/testimonials', label: 'Testimonials', icon: 'MessageSquare' },
    { path: '/settings', label: 'Settings', icon: 'Settings' }
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <ApperIcon name="Star" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ReviewSync</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <ApperIcon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.emailAddress}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-2"
                  >
                    <ApperIcon name="LogOut" size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default Layout;