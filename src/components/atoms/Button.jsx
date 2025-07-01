import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-button hover:shadow-button-hover focus:ring-primary-500',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-button hover:shadow-button-hover focus:ring-primary-500',
    success: 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-button hover:shadow-button-hover focus:ring-success-500',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600 hover:from-warning-600 hover:to-warning-700 text-white shadow-button hover:shadow-button-hover focus:ring-warning-500',
    error: 'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-button hover:shadow-button-hover focus:ring-error-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
    xl: 'px-8 py-5 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button