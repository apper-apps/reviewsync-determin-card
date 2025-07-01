import React from 'react'
import { motion } from 'framer-motion'
import ReviewCard from '@/components/molecules/ReviewCard'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'

const ReviewsList = ({ reviews, business }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Empty
        type="reviews"
        onAction={() => window.location.reload()}
        actionLabel="Refresh Reviews"
      />
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ApperIcon name="MessageCircle" size={24} className="text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
            {reviews.length} reviews
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewCard
key={review.Id}
            review={review}
            index={index}
          />
        ))}
      </div>

      {reviews.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-gray-500 text-sm">
            Showing {reviews.length} most recent reviews from Google
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default ReviewsList