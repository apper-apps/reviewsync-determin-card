import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'reviews' }) => {
  const renderSkeletonReviews = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          className="bg-white p-6 rounded-xl shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-32" />
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-4/5" />
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/5" />
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderSkeletonBusiness = () => (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-48" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-64" />
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderSkeletonDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            className="bg-white p-6 rounded-xl shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-32" />
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
                  ))}
                </div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-16" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="animate-fadeIn">
      {type === 'reviews' && renderSkeletonReviews()}
      {type === 'business' && renderSkeletonBusiness()}
      {type === 'dashboard' && renderSkeletonDashboard()}
    </div>
  )
}

export default Loading