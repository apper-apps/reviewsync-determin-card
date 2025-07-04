import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PREDEFINED_THEMES = {
  classic: {
    name: 'Classic',
    primaryColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderColor: '#E5E7EB',
    starColor: '#F59E0B',
    borderRadius: 8,
    shadow: 'medium',
    layout: 'card',
    spacing: 'normal',
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    columns: 1,
    aspectRatio: 'auto',
    alignment: 'left',
    animation: 'subtle'
  },
  modern: {
    name: 'Modern',
    primaryColor: '#8B5CF6',
    backgroundColor: '#F8FAFC',
    textColor: '#0F172A',
    borderColor: '#CBD5E1',
    starColor: '#F59E0B',
    borderRadius: 12,
    shadow: 'large',
    layout: 'card',
    spacing: 'compact',
    fontFamily: 'Roboto',
    fontSize: 'medium',
    fontWeight: 'medium',
    columns: 1,
    aspectRatio: 'square',
    alignment: 'center',
    animation: 'smooth'
  },
  minimal: {
    name: 'Minimal',
    primaryColor: '#6B7280',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
    borderColor: '#F3F4F6',
    starColor: '#D97706',
    borderRadius: 4,
    shadow: 'none',
    layout: 'list',
    spacing: 'minimal',
    fontFamily: 'Open Sans',
    fontSize: 'small',
    fontWeight: 'light',
    columns: 1,
    aspectRatio: 'auto',
    alignment: 'left',
    animation: 'none'
  },
  dark: {
    name: 'Dark',
    primaryColor: '#10B981',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    borderColor: '#374151',
    starColor: '#F59E0B',
    borderRadius: 8,
    shadow: 'medium',
    layout: 'card',
    spacing: 'normal',
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    columns: 1,
    aspectRatio: 'auto',
    alignment: 'left',
    animation: 'subtle'
  },
  vibrant: {
    name: 'Vibrant',
    primaryColor: '#EF4444',
    backgroundColor: '#FEF2F2',
    textColor: '#7F1D1D',
    borderColor: '#FECACA',
    starColor: '#F59E0B',
    borderRadius: 16,
    shadow: 'large',
    layout: 'card',
    spacing: 'wide',
    fontFamily: 'Lato',
    fontSize: 'large',
    fontWeight: 'bold',
    columns: 2,
    aspectRatio: 'wide',
    alignment: 'center',
    animation: 'dynamic'
  },
  corporate: {
    name: 'Corporate',
    primaryColor: '#1E40AF',
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B',
    borderColor: '#E2E8F0',
    starColor: '#D97706',
    borderRadius: 6,
    shadow: 'small',
    layout: 'list',
    spacing: 'normal',
    fontFamily: 'Roboto',
    fontSize: 'medium',
    fontWeight: 'medium',
    columns: 1,
    aspectRatio: 'auto',
    alignment: 'left',
    animation: 'subtle'
  }
};

function WidgetThemeSelector({ selectedTheme, onThemeChange, onPreview }) {
  const [customizing, setCustomizing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [customTheme, setCustomTheme] = useState(selectedTheme || PREDEFINED_THEMES.classic);

  const handlePredefinedThemeSelect = (themeKey) => {
    const theme = PREDEFINED_THEMES[themeKey];
    setCustomTheme(theme);
    onThemeChange(theme);
    setCustomizing(false);
  };

  const handleCustomThemeChange = (property, value) => {
    const updatedTheme = { ...customTheme, [property]: value };
    setCustomTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const handleColorChange = (property, color) => {
    handleCustomThemeChange(property, color.hex);
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Widget Theme</h3>
          <p className="text-sm text-muted-foreground">
            Choose a theme or customize your own
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCustomizing(!customizing)}
            className={customizing ? 'bg-primary text-primary-foreground' : ''}
          >
            <ApperIcon name="Palette" size={16} className="mr-2" />
            Customize
          </Button>
          <Button
            size="sm"
            onClick={() => onPreview(customTheme)}
          >
            <ApperIcon name="Eye" size={16} className="mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {!customizing ? (
        /* Predefined Themes Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(PREDEFINED_THEMES).map(([key, theme]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePredefinedThemeSelect(key)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedTheme?.name === theme.name
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Theme Preview */}
              <div 
                className="rounded mb-3 p-3 text-xs"
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderRadius: `${theme.borderRadius}px`,
                  border: `1px solid ${theme.borderColor}`
                }}
              >
                <div className="font-medium mb-1">John Doe</div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{ color: theme.starColor }}>★</span>
                  ))}
                </div>
                <div className="opacity-75">Great service!</div>
              </div>
              
              {/* Theme Name */}
              <div className="text-sm font-medium text-foreground text-center">
                {theme.name}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Custom Theme Editor */
<div className="bg-card border rounded-lg p-6 space-y-6">
          {/* Color Customization */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'primaryColor', label: 'Primary' },
                { key: 'backgroundColor', label: 'Background' },
                { key: 'textColor', label: 'Text' },
                { key: 'borderColor', label: 'Border' },
                { key: 'starColor', label: 'Stars' }
              ].map(({ key, label }) => (
                <div key={key} className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                  </label>
                  <div
                    className="w-full h-10 border border-border rounded cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: customTheme[key] }}
                    onClick={() => setShowColorPicker(showColorPicker === key ? null : key)}
                  >
                    <span className="text-xs font-medium text-white mix-blend-difference">
                      {customTheme[key]}
                    </span>
                  </div>
                  
                  {showColorPicker === key && (
                    <div className="absolute top-full left-0 z-50 mt-2">
                      <div
                        className="fixed inset-0"
                        onClick={() => setShowColorPicker(null)}
                      />
                      <SketchPicker
                        color={customTheme[key]}
                        onChange={(color) => handleColorChange(key, color)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Typography</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Font Family
                </label>
                <select
                  value={customTheme.fontFamily}
                  onChange={(e) => handleCustomThemeChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Nunito">Nunito</option>
                </select>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Font Size
                </label>
                <select
                  value={customTheme.fontSize}
                  onChange={(e) => handleCustomThemeChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Font Weight
                </label>
                <select
                  value={customTheme.fontWeight}
                  onChange={(e) => handleCustomThemeChange('fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="light">Light</option>
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semi Bold</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout Options */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Layout & Appearance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Border Radius */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Border Radius
                </label>
                <select
                  value={customTheme.borderRadius}
                  onChange={(e) => handleCustomThemeChange('borderRadius', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value={0}>None</option>
                  <option value={4}>Small</option>
                  <option value={8}>Medium</option>
                  <option value={12}>Large</option>
                  <option value={16}>Extra Large</option>
                </select>
              </div>

              {/* Shadow */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Shadow
                </label>
                <select
                  value={customTheme.shadow}
                  onChange={(e) => handleCustomThemeChange('shadow', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              {/* Layout Style */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Layout
                </label>
                <select
                  value={customTheme.layout}
                  onChange={(e) => handleCustomThemeChange('layout', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="card">Card</option>
                  <option value="list">List</option>
                  <option value="grid">Grid</option>
                  <option value="carousel">Carousel</option>
                </select>
              </div>

              {/* Spacing */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Spacing
                </label>
                <select
                  value={customTheme.spacing}
                  onChange={(e) => handleCustomThemeChange('spacing', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="minimal">Minimal</option>
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="wide">Wide</option>
                </select>
              </div>

              {/* Columns */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Columns
                </label>
                <select
                  value={customTheme.columns}
                  onChange={(e) => handleCustomThemeChange('columns', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value={1}>Single</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                </select>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={customTheme.aspectRatio}
                  onChange={(e) => handleCustomThemeChange('aspectRatio', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="auto">Auto</option>
                  <option value="square">Square</option>
                  <option value="wide">Wide (16:9)</option>
                  <option value="tall">Tall (3:4)</option>
                </select>
              </div>

              {/* Alignment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Alignment
                </label>
                <select
                  value={customTheme.alignment}
                  onChange={(e) => handleCustomThemeChange('alignment', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>

              {/* Animation */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Animation
                </label>
                <select
                  value={customTheme.animation}
                  onChange={(e) => handleCustomThemeChange('animation', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="none">None</option>
                  <option value="subtle">Subtle</option>
                  <option value="smooth">Smooth</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset to Predefined */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">
                Reset to a predefined theme or save your custom theme
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCustomTheme(PREDEFINED_THEMES.classic);
                  onThemeChange(PREDEFINED_THEMES.classic);
                }}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => onPreview(customTheme)}
              >
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WidgetThemeSelector;