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
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    backgroundGradient: false,
    gradientFrom: '#ffffff',
    gradientTo: '#f8fafc',
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
    { value: 'minimal', label: 'Minimal Layout' },
    { value: 'grid', label: 'Grid Layout' },
    { value: 'carousel', label: 'Carousel Layout' }
  ]

  const colorPresets = [
    { name: 'Google Blue', value: '#1a73e8' },
    { name: 'Success Green', value: '#34a853' },
    { name: 'Warning Orange', value: '#fbbc04' },
    { name: 'Error Red', value: '#ea4335' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Teal', value: '#009688' }
  ]

  const fontFamilies = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Nunito', label: 'Nunito' }
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

        {/* Typography */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Typography</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Font Family"
                value={localSettings.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
              >
                {fontFamilies.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Input
                type="number"
                label="Font Size (px)"
                value={localSettings.fontSize}
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                min={10}
                max={24}
              />
            </div>
            <div>
              <Select
                label="Font Weight"
                value={localSettings.fontWeight}
                onChange={(e) => handleChange('fontWeight', parseInt(e.target.value))}
              >
                <option value={300}>Light</option>
                <option value={400}>Normal</option>
                <option value={500}>Medium</option>
                <option value={600}>Semi Bold</option>
                <option value={700}>Bold</option>
              </Select>
            </div>
            <div>
              <Input
                type="number"
                label="Line Height"
                value={localSettings.lineHeight}
                onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
                min={1}
                max={3}
                step={0.1}
              />
            </div>
          </div>
        </div>

        {/* Border Styling */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Borders</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Border Style"
                value={localSettings.borderStyle}
                onChange={(e) => handleChange('borderStyle', e.target.value)}
              >
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </Select>
            </div>
            <div>
              <Input
                type="number"
                label="Border Width (px)"
                value={localSettings.borderWidth}
                onChange={(e) => handleChange('borderWidth', parseInt(e.target.value))}
                min={0}
                max={10}
              />
            </div>
          </div>
        </div>

        {/* Spacing Controls */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Spacing</h4>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <Input
                type="number"
                label="Padding Top"
                value={localSettings.paddingTop}
                onChange={(e) => handleChange('paddingTop', parseInt(e.target.value))}
                min={0}
                max={48}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Padding Right"
                value={localSettings.paddingRight}
                onChange={(e) => handleChange('paddingRight', parseInt(e.target.value))}
                min={0}
                max={48}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Padding Bottom"
                value={localSettings.paddingBottom}
                onChange={(e) => handleChange('paddingBottom', parseInt(e.target.value))}
                min={0}
                max={48}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Padding Left"
                value={localSettings.paddingLeft}
                onChange={(e) => handleChange('paddingLeft', parseInt(e.target.value))}
                min={0}
                max={48}
              />
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Background</h4>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              Use Gradient Background
            </label>
            <button
              onClick={() => handleChange('backgroundGradient', !localSettings.backgroundGradient)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localSettings.backgroundGradient ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localSettings.backgroundGradient ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {localSettings.backgroundGradient && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="color"
                  label="Gradient From"
                  value={localSettings.gradientFrom}
                  onChange={(e) => handleChange('gradientFrom', e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="color"
                  label="Gradient To"
                  value={localSettings.gradientTo}
                  onChange={(e) => handleChange('gradientTo', e.target.value)}
                />
              </div>
            </div>
          )}
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
                accentColor: '#1a73e8',
                borderStyle: 'solid',
                borderWidth: 1,
                paddingTop: 16,
                paddingRight: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.5,
                backgroundGradient: false,
                gradientFrom: '#ffffff',
                gradientTo: '#f8fafc'
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