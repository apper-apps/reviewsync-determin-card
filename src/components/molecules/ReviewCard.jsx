import React from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import StarRating from '@/components/molecules/StarRating'
import ApperIcon from '@/components/ApperIcon'

const ReviewCard = ({ review, index = 0 }) => {
  const timeAgo = formatDistanceToNow(new Date(review.publishedAt), { addSuffix: true })

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {review.authorPhotoUrl ? (
            <img
              src={review.authorPhotoUrl}
              alt={review.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={24} className="text-primary-600" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 truncate">
              {review.authorName}
            </h4>
            <time className="text-sm text-gray-500 flex-shrink-0 ml-2">
              {timeAgo}
            </time>
          </div>

          <div className="mb-3">
            <StarRating rating={review.rating} size={16} showRating={false} />
          </div>

          {review.text && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {review.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewCard