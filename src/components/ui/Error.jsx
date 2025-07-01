import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = 'general',
  showIcon = true 
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'api':
        return {
          icon: 'CloudOff',
          title: 'API Connection Failed',
          description: 'Unable to connect to Google Places API. Please check your API configuration.',
          gradient: 'from-error-500 to-error-600'
        }
      case 'search':
        return {
          icon: 'SearchX',
          title: 'Search Failed',
          description: 'We couldn\'t find any results for your search. Please try a different business name or address.',
          gradient: 'from-warning-500 to-warning-600'
        }
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Network Error',
          description: 'Please check your internet connection and try again.',
          gradient: 'from-error-500 to-error-600'
        }
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Oops! Something went wrong',
          description: message,
          gradient: 'from-error-500 to-error-600'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur opacity-20 animate-pulse`} />
        {showIcon && (
          <div className="relative bg-white p-4 rounded-full shadow-card">
            <ApperIcon 
              name={config.icon} 
              size={48} 
              className="text-error-500"
            />
          </div>
        )}
      </div>

      <div className="max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {config.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {config.description}
        </p>

        {onRetry && (
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onRetry}
              variant="primary"
              className="inline-flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              <span>Try Again</span>
            </Button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-400">
        If the problem persists, please check your API configuration or contact support.
      </div>
    </motion.div>
  )
}

export default Error