import React from 'react'
import { motion } from 'framer-motion'
import StarRating from '@/components/molecules/StarRating'
import ApperIcon from '@/components/ApperIcon'

const WidgetPreview = ({ business, reviews, theme = 'card', settings = {} }) => {
  const {
    maxReviews = 3,
    minRating = 1,
    showBusinessInfo = true,
    showDates = true,
    accentColor = '#1a73e8',
    borderStyle = 'solid',
    borderWidth = 1,
    paddingTop = 16,
    paddingRight = 16,
    paddingBottom = 16,
    paddingLeft = 16,
    fontFamily = 'Inter',
    fontSize = 14,
    fontWeight = 400,
    lineHeight = 1.5,
    backgroundGradient = false,
    gradientFrom = '#ffffff',
    gradientTo = '#f8fafc',
    columns = 1,
    aspectRatio = 'auto',
    alignment = 'left',
    animation = 'subtle'
  } = settings

  const filteredReviews = reviews
    .filter(review => review.rating >= minRating)
    .slice(0, maxReviews)

  const getContainerStyles = () => {
    const styles = {
      padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
      textAlign: alignment,
      border: borderStyle !== 'none' ? `${borderWidth}px ${borderStyle} ${accentColor}20` : 'none'
    }

    if (backgroundGradient) {
      styles.background = `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
    }

    if (aspectRatio !== 'auto') {
      const ratios = {
        square: '1/1',
        wide: '16/9',
        tall: '3/4'
      }
      styles.aspectRatio = ratios[aspectRatio] || 'auto'
    }

    return styles
  }

  const getAnimationClass = () => {
    const animations = {
      none: '',
      subtle: 'transition-all duration-200 hover:shadow-sm',
      smooth: 'transition-all duration-300 hover:shadow-md hover:scale-102',
      dynamic: 'transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-rotate-1'
    }
    return animations[animation] || ''
  }

  const getGridClass = () => {
    if (theme === 'grid') {
      const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }
      return `grid gap-4 ${gridClasses[columns] || 'grid-cols-1'}`
    }
    return ''
  }

  const renderCardTheme = () => (
    <div className={`space-y-4 ${getGridClass()}`}>
      {showBusinessInfo && (
        <div className="text-center pb-4 border-b border-gray-200 col-span-full">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {business.Name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <StarRating rating={business.rating} size={16} />
            <span className="text-sm text-gray-600">
              ({business.total_reviews} reviews)
            </span>
          </div>
        </div>
      )}
      
      {filteredReviews.map((review, index) => (
        <div key={review.Id} className={`bg-gray-50 rounded-lg p-4 ${getAnimationClass()}`}>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-900">
                  {review.author_name}
                </span>
                {showDates && (
                  <span className="text-xs text-gray-500">
                    {new Date(review.published_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              <StarRating rating={review.rating} size={14} showRating={false} />
              {review.text && (
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                  {review.text}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderListTheme = () => (
    <div className="space-y-3">
      {showBusinessInfo && (
        <div className="text-center pb-3 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">
            {business.Name}
          </h3>
          <div className="flex items-center justify-center space-x-2 mt-1">
            <StarRating rating={business.rating} size={14} />
            <span className="text-xs text-gray-600">
              {business.total_reviews} reviews
            </span>
          </div>
        </div>
      )}
      
      {filteredReviews.map((review, index) => (
        <div key={review.Id} className={`flex items-start space-x-3 py-2 ${getAnimationClass()}`}>
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={12} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs text-gray-900">
                {review.author_name}
              </span>
              <StarRating rating={review.rating} size={12} showRating={false} />
            </div>
            {review.text && (
              <p className="text-xs text-gray-700 mt-1 line-clamp-2">
                {review.text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderMinimalTheme = () => (
    <div className="text-center space-y-3">
      {showBusinessInfo && (
        <div className="pb-3 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {business.Name}
          </h3>
          <StarRating rating={business.rating} size={16} className="justify-center" />
        </div>
      )}
      
      <div className="space-y-2">
        {filteredReviews.map((review, index) => (
          <div key={review.Id} className={`text-center ${getAnimationClass()}`}>
            <StarRating rating={review.rating} size={14} className="justify-center mb-1" />
            <p className="text-xs text-gray-700 italic">
              "{review.text ? review.text.substring(0, 100) + '...' : 'Great experience!'}"
            </p>
            <span className="text-xs text-gray-500">- {review.author_name}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGridTheme = () => (
    <div className={getGridClass()}>
      {showBusinessInfo && (
        <div className="text-center pb-4 border-b border-gray-200 col-span-full">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {business.Name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <StarRating rating={business.rating} size={16} />
            <span className="text-sm text-gray-600">
              ({business.total_reviews} reviews)
            </span>
          </div>
        </div>
      )}
      
      {filteredReviews.map((review, index) => (
        <div key={review.Id} className={`bg-gray-50 rounded-lg p-3 ${getAnimationClass()}`}>
          <div className="text-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <ApperIcon name="User" size={12} className="text-gray-600" />
            </div>
            <StarRating rating={review.rating} size={12} className="justify-center mb-2" />
            <span className="font-medium text-xs text-gray-900 block mb-1">
              {review.author_name}
            </span>
            {review.text && (
              <p className="text-xs text-gray-700 line-clamp-2">
                {review.text}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderCarouselTheme = () => (
    <div className="space-y-4">
      {showBusinessInfo && (
        <div className="text-center pb-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {business.Name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <StarRating rating={business.rating} size={16} />
            <span className="text-sm text-gray-600">
              ({business.total_reviews} reviews)
            </span>
          </div>
        </div>
      )}
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {filteredReviews.map((review, index) => (
          <div key={review.Id} className={`bg-gray-50 rounded-lg p-4 min-w-64 ${getAnimationClass()}`}>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="User" size={16} className="text-gray-600" />
              </div>
              <StarRating rating={review.rating} size={14} className="justify-center mb-2" />
              <span className="font-medium text-sm text-gray-900 block mb-2">
                {review.author_name}
              </span>
              {review.text && (
                <p className="text-sm text-gray-700 line-clamp-3">
                  {review.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const themeRenderers = {
    card: renderCardTheme,
    list: renderListTheme,
    minimal: renderMinimalTheme,
    grid: renderGridTheme,
    carousel: renderCarouselTheme
  }

  return (
    <motion.div
      className="widget-preview active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div 
        className={`bg-white border rounded-lg max-w-sm mx-auto ${getAnimationClass()}`}
        style={getContainerStyles()}
      >
        {themeRenderers[theme] ? themeRenderers[theme]() : renderCardTheme()}
        
        <div className="text-center mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
            <ApperIcon name="Star" size={12} />
            <span>Powered by ReviewSync</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WidgetPreview