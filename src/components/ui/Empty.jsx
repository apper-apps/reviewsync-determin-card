import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  type = 'general',
  onAction,
  actionLabel = 'Get Started'
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case 'reviews':
        return {
          icon: 'Star',
          title: 'No Reviews Found',
          description: 'This business doesn\'t have any Google Reviews yet, or they might be private.',
          actionLabel: 'Search Another Business',
          gradient: 'from-warning-400 to-warning-500'
        }
      case 'businesses':
        return {
          icon: 'Building2',
          title: 'No Saved Businesses',
          description: 'You haven\'t saved any businesses yet. Search for a business to get started with creating review widgets.',
          actionLabel: 'Search Businesses',
          gradient: 'from-primary-400 to-primary-500'
        }
      case 'widgets':
        return {
          icon: 'Code',
          title: 'No Widgets Created',
          description: 'You haven\'t created any review widgets yet. Build your first widget to display your Google Reviews.',
          actionLabel: 'Create Widget',
          gradient: 'from-success-400 to-success-500'
        }
      case 'search':
        return {
          icon: 'Search',
          title: 'Start Your Search',
          description: 'Enter your business name and address, or paste a Google Maps URL to fetch your reviews.',
          actionLabel: 'Search Now',
          gradient: 'from-info-400 to-info-500'
        }
      default:
        return {
          icon: 'Inbox',
          title: 'Nothing Here Yet',
          description: 'This area is empty. Take action to see content appear here.',
          actionLabel: actionLabel,
          gradient: 'from-gray-400 to-gray-500'
        }
    }
  }

  const config = getEmptyConfig()

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative mb-8">
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur-xl opacity-20 animate-pulse`} />
        <div className="relative bg-white p-6 rounded-full shadow-card-hover">
          <ApperIcon 
            name={config.icon} 
            size={64} 
            className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
          />
        </div>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">
            {config.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-lg">
            {config.description}
          </p>
        </div>

        {onAction && (
          <motion.div
            className="pt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className={`bg-gradient-to-r ${config.gradient} hover:shadow-button-hover transform hover:scale-105 transition-all`}
            >
              <ApperIcon name="ArrowRight" size={20} className="ml-2" />
              {config.actionLabel}
            </Button>
          </motion.div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-8 opacity-20">
        {['Star', 'Building2', 'Code'].map((iconName, index) => (
          <motion.div
            key={iconName}
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <ApperIcon name={iconName} size={24} className="text-gray-400" />
            <div className="w-12 h-1 bg-gray-200 rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Empty