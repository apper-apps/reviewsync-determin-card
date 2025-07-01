import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import BusinessCard from '@/components/molecules/BusinessCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import businessService from '@/services/api/businessService'
import widgetService from '@/services/api/widgetService'

const DashboardPage = () => {
  const [businesses, setBusinesses] = useState([])
  const [widgets, setWidgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalWidgets: 0,
    totalReviews: 0,
    averageRating: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [businessesData, widgetsData] = await Promise.all([
        businessService.getAll(),
        widgetService.getAll()
      ])

      setBusinesses(businessesData)
      setWidgets(widgetsData)

      // Calculate stats
const totalReviews = businessesData.reduce((sum, business) => sum + (business.total_reviews || 0), 0)
      const averageRating = businessesData.length > 0 
        ? businessesData.reduce((sum, business) => sum + business.rating, 0) / businessesData.length
        : 0

      setStats({
        totalBusinesses: businessesData.length,
        totalWidgets: widgetsData.length,
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1))
      })
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWidget = async (widgetId) => {
    if (!confirm('Are you sure you want to delete this widget?')) return

    try {
      await widgetService.delete(widgetId)
setWidgets(widgets.filter(w => w.Id !== widgetId))
      toast.success('Widget deleted successfully')
    } catch (err) {
      toast.error('Failed to delete widget')
    }
  }

  if (loading) {
    return <Loading type="dashboard" />
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadDashboardData}
        type="general"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your businesses and review widgets
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          {
            title: 'Total Businesses',
            value: stats.totalBusinesses,
            icon: 'Building2',
            gradient: 'from-primary-500 to-primary-600',
            bgGradient: 'from-primary-50 to-primary-100'
          },
          {
            title: 'Active Widgets',
            value: stats.totalWidgets,
            icon: 'Code',
            gradient: 'from-success-500 to-success-600',
            bgGradient: 'from-success-50 to-success-100'
          },
          {
            title: 'Total Reviews',
            value: stats.totalReviews,
            icon: 'MessageCircle',
            gradient: 'from-warning-500 to-warning-600',
            bgGradient: 'from-warning-50 to-warning-100'
          },
          {
            title: 'Average Rating',
            value: stats.averageRating,
            icon: 'Star',
            gradient: 'from-info-500 to-info-600',
            bgGradient: 'from-info-50 to-info-100'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl p-6 border border-white/50`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                <ApperIcon name={stat.icon} size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Businesses Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Building2" size={24} className="text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Businesses
            </h2>
            <Badge variant="primary" size="sm">
              {businesses.length}
            </Badge>
          </div>
          
          <Button
            onClick={() => window.location.href = '/search'}
            variant="primary"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Business
          </Button>
        </div>

        {businesses.length === 0 ? (
          <Empty
            type="businesses"
            onAction={() => window.location.href = '/search'}
            actionLabel="Search Businesses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business, index) => (
              <motion.div
key={business.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BusinessCard business={business} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Widgets Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Code" size={24} className="text-success-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Widgets
            </h2>
            <Badge variant="success" size="sm">
              {widgets.length}
            </Badge>
          </div>
        </div>

        {widgets.length === 0 ? (
          <Empty
            type="widgets"
            onAction={() => window.location.href = '/search'}
            actionLabel="Create First Widget"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map((widget, index) => {
const business = businesses.find(b => b.Id === widget.business_id)
              return (
                <motion.div
key={widget.Id}
                  className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Code" size={24} className="text-success-600" />
                      </div>
                      <div>
<h3 className="font-semibold text-gray-900">
                          {business?.Name || 'Unknown Business'}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {widget.theme} Theme
                        </p>
                      </div>
                    </div>
                    
                    <Button
onClick={() => handleDeleteWidget(widget.Id)}
                      variant="ghost"
                      size="sm"
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>

<div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Max Reviews:</span>
                      <span className="font-medium">{(() => {
                        try {
                          const settings = typeof widget.settings === 'string' 
                            ? JSON.parse(widget.settings || '{}') 
                            : widget.settings || {};
                          return settings.maxReviews || 3;
                        } catch (error) {
                          return 3;
                        }
                      })()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Min Rating:</span>
                      <span className="font-medium">{(() => {
                        try {
                          const settings = typeof widget.settings === 'string' 
                            ? JSON.parse(widget.settings || '{}') 
                            : widget.settings || {};
                          return (settings.minRating || 1) + '+ stars';
                        } catch (error) {
                          return '1+ stars';
                        }
                      })()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Business Info:</span>
                      <span className="font-medium">
                        {(() => {
                          try {
                            const settings = typeof widget.settings === 'string' 
                              ? JSON.parse(widget.settings || '{}') 
                              : widget.settings || {};
                            return settings.showBusinessInfo ? 'Shown' : 'Hidden';
                          } catch (error) {
                            return 'Hidden';
                          }
                        })()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
onClick={() => window.location.href = `/widget/${widget.business_id}`}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <ApperIcon name="Edit" size={16} className="mr-2" />
                      Edit Widget
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default DashboardPage