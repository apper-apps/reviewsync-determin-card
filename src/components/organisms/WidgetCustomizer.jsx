import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const WidgetCustomizer = ({ onSettingsChange, settings = {} }) => {
  const [localSettings, setLocalSettings] = useState({
    theme: 'card',
    maxReviews: 3,
    minRating: 1,
    showBusinessInfo: true,
    showDates: true,
    accentColor: '#1a73e8',
    ...settings
  })

  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const themes = [
    { value: 'card', label: 'Card Layout' },
    { value: 'list', label: 'List Layout' },
    { value: 'minimal', label: 'Minimal Layout' }
  ]

  const colorPresets = [
    { name: 'Google Blue', value: '#1a73e8' },
    { name: 'Success Green', value: '#34a853' },
    { name: 'Warning Orange', value: '#fbbc04' },
    { name: 'Error Red', value: '#ea4335' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Teal', value: '#009688' }
  ]

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <ApperIcon name="Palette" size={24} className="text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Customize Widget
        </h3>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <Select
            label="Theme"
            value={localSettings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            {themes.map(theme => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Display Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              label="Max Reviews"
              value={localSettings.maxReviews}
              onChange={(e) => handleChange('maxReviews', parseInt(e.target.value))}
            >
              <option value={1}>1 Review</option>
              <option value={3}>3 Reviews</option>
              <option value={5}>5 Reviews</option>
              <option value={10}>10 Reviews</option>
            </Select>
          </div>

          <div>
            <Select
              label="Min Rating"
              value={localSettings.minRating}
              onChange={(e) => handleChange('minRating', parseInt(e.target.value))}
            >
              <option value={1}>1+ Stars</option>
              <option value={2}>2+ Stars</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars Only</option>
            </Select>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Show Business Info
            </label>
            <button
              onClick={() => handleChange('showBusinessInfo', !localSettings.showBusinessInfo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localSettings.showBusinessInfo ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localSettings.showBusinessInfo ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Show Review Dates
            </label>
            <button
              onClick={() => handleChange('showDates', !localSettings.showDates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localSettings.showDates ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localSettings.showDates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Color Customization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Accent Color
          </label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {colorPresets.map((color) => (
              <button
                key={color.value}
                onClick={() => handleChange('accentColor', color.value)}
                className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                  localSettings.accentColor === color.value
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-full h-4 rounded mb-1"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </button>
            ))}
          </div>
          
          <Input
            type="color"
            value={localSettings.accentColor}
            onChange={(e) => handleChange('accentColor', e.target.value)}
            className="h-12"
          />
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={() => {
              const defaultSettings = {
                theme: 'card',
                maxReviews: 3,
                minRating: 1,
                showBusinessInfo: true,
                showDates: true,
                accentColor: '#1a73e8'
              }
              setLocalSettings(defaultSettings)
              onSettingsChange(defaultSettings)
            }}
            variant="ghost"
            className="w-full"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default WidgetCustomizer