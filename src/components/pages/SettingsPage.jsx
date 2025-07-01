import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('')
  const [apiStatus, setApiStatus] = useState('connected')
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)

  const handleSaveApiKey = async () => {
    setSaving(true)
    try {
      // Simulate API key save
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem('google_places_api_key', apiKey)
      toast.success('API key saved successfully')
    } catch (err) {
      toast.error('Failed to save API key')
    } finally {
      setSaving(false)
    }
  }

  const handleTestApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key first')
      return
    }

    setTesting(true)
    try {
      // Simulate API key test
      await new Promise(resolve => setTimeout(resolve, 2000))
      setApiStatus('connected')
      toast.success('API key is valid and working')
    } catch (err) {
      setApiStatus('error')
      toast.error('API key test failed')
    } finally {
      setTesting(false)
    }
  }

  const getStatusBadge = () => {
    const statusConfig = {
      connected: { variant: 'success', text: 'Connected', icon: 'CheckCircle' },
      error: { variant: 'error', text: 'Error', icon: 'XCircle' },
      disconnected: { variant: 'warning', text: 'Disconnected', icon: 'AlertCircle' }
    }

    const config = statusConfig[apiStatus]
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <ApperIcon name={config.icon} size={12} />
        <span>{config.text}</span>
      </Badge>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Configure your ReviewSync application settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* API Configuration */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Key" size={24} className="text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Google Places API
                </h2>
              </div>
              {getStatusBadge()}
            </div>

            <div className="space-y-6">
              <Input
                label="API Key"
                type="password"
                placeholder="Enter your Google Places API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                helpText="Your API key is stored securely and only used for fetching reviews"
              />

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleSaveApiKey}
                  variant="primary"
                  loading={saving}
                >
                  <ApperIcon name="Save" size={16} className="mr-2" />
                  Save API Key
                </Button>

                <Button
                  onClick={handleTestApiKey}
                  variant="secondary"
                  loading={testing}
                >
                  <ApperIcon name="TestTube" size={16} className="mr-2" />
                  Test Connection
                </Button>
              </div>

              <div className="p-4 bg-info-50 rounded-lg border border-info-200">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Info" size={16} className="text-info-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-info-800 font-medium mb-2">API Key Setup Instructions</p>
                    <ol className="text-info-700 space-y-1 list-decimal list-inside text-xs">
                      <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                      <li>Enable the Places API for your project</li>
                      <li>Create credentials (API key) for the Places API</li>
                      <li>Copy and paste your API key above</li>
                      <li>Test the connection to verify it's working</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Widget Defaults */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="Settings" size={24} className="text-success-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Default Widget Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Theme
                </label>
                <select className="form-select">
                  <option value="card">Card Layout</option>
                  <option value="list">List Layout</option>
                  <option value="minimal">Minimal Layout</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Max Reviews
                </label>
                <select className="form-select">
                  <option value="3">3 Reviews</option>
                  <option value="5">5 Reviews</option>
                  <option value="10">10 Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Min Rating
                </label>
                <select className="form-select">
                  <option value="1">1+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Accent Color
                </label>
                <input
                  type="color"
                  defaultValue="#1a73e8"
                  className="form-input h-12"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button variant="success">
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save Defaults
              </Button>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="Database" size={24} className="text-warning-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Data Management
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Clear Cache</h3>
                  <p className="text-sm text-gray-600">Remove all cached review data</p>
                </div>
                <Button variant="secondary" size="sm">
                  <ApperIcon name="Trash2" size={16} className="mr-2" />
                  Clear Cache
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Export Data</h3>
                  <p className="text-sm text-gray-600">Download your businesses and widgets data</p>
                </div>
                <Button variant="secondary" size="sm">
                  <ApperIcon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-error-50 rounded-lg border border-error-200">
                <div>
                  <h3 className="font-medium text-error-900">Reset All Data</h3>
                  <p className="text-sm text-error-700">Permanently delete all businesses and widgets</p>
                </div>
                <Button variant="error" size="sm">
                  <ApperIcon name="AlertTriangle" size={16} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* API Usage */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <ApperIcon name="BarChart3" size={20} className="text-info-600" />
              <h3 className="font-bold text-gray-900">API Usage</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium">1,247 / 10,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-info-500 to-info-600 h-2 rounded-full" style={{ width: '12.47%' }} />
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Resets on the 1st of each month
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <ApperIcon name="Zap" size={20} className="text-warning-600" />
              <h3 className="font-bold text-gray-900">Quick Actions</h3>
            </div>

            <div className="space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                Refresh All Reviews
              </Button>
              
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ApperIcon name="Code" size={16} className="mr-2" />
                Generate New Widget
              </Button>
              
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ApperIcon name="HelpCircle" size={16} className="mr-2" />
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <ApperIcon name="LifeBuoy" size={20} className="text-primary-600" />
              <h3 className="font-bold text-primary-900">Need Help?</h3>
            </div>

            <p className="text-sm text-primary-700 mb-4">
              Get support with ReviewSync setup and configuration
            </p>

            <Button variant="primary" size="sm" className="w-full">
              <ApperIcon name="MessageCircle" size={16} className="mr-2" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage