import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 16, 
  showRating = true,
  className = '' 
}) => {
  const stars = []
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating)
    const isHalfFilled = i === Math.ceil(rating) && rating % 1 !== 0
    
    stars.push(
      <div key={i} className="relative">
        <ApperIcon
          name="Star"
          size={size}
          className={`${isFilled ? 'text-warning-500 fill-current' : 'text-gray-300'} transition-colors`}
        />
        {isHalfFilled && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <ApperIcon
              name="Star"
              size={size}
              className="text-warning-500 fill-current"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center space-x-0.5">
        {stars}
      </div>
      {showRating && (
        <span className="text-sm font-medium text-gray-700 ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating