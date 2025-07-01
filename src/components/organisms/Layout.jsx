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
      {/* Header with modern glass effect */}
      <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  <ApperIcon name="Star" size={20} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                ReviewSync
              </span>
            </Link>

            {/* Enhanced Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <ApperIcon name={item.icon} size={16} />
                  <span>{item.label}</span>
                  {isActivePath(item.path) && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/20"
                      layoutId="activeTab"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Enhanced User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.emailAddress}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-foreground">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-2 border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200"
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

      {/* Main Content with improved spacing */}
      <main className="flex-1 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}

export default Layout;