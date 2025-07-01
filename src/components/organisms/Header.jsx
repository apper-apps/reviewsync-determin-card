import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { AuthContext } from '@/App'
const Header = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const navigation = [
    { name: 'Search', href: '/search', icon: 'Search' },
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]

  const isActive = (path) => {
    if (path === '/search' && (location.pathname === '/' || location.pathname === '/search')) {
      return true
    }
    return location.pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Star" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                ReviewSync
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Google Reviews Widget</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

{/* User Menu and Logout */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && user && (
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                  <div className="text-gray-500">{user.emailAddress}</div>
                </div>
                <Button onClick={logout} variant="outline" size="sm">
                  <ApperIcon name="LogOut" size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-gray-600">API Connected</span>
            </div>
            <Button variant="outline" size="sm">
              <ApperIcon name="HelpCircle" size={16} className="mr-2" />
              Help
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ApperIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
            
<div className="pt-4 border-t border-gray-200">
              {isAuthenticated && user && (
                <div className="px-4 py-2 mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-gray-500 mb-3">{user.emailAddress}</div>
                  <Button onClick={logout} variant="outline" size="sm" className="w-full">
                    <ApperIcon name="LogOut" size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                  <span className="text-gray-600">API Connected</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="HelpCircle" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header