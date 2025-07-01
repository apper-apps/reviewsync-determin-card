import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StarRating from '@/components/molecules/StarRating'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const BusinessCard = ({ business, onCreateWidget }) => {
  const navigate = useNavigate()

  const handleCreateWidget = () => {
    if (onCreateWidget) {
      onCreateWidget(business)
    } else {
navigate(`/widget/${business.Id}`)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
            <ApperIcon name="Building2" size={32} className="text-primary-600" />
          </div>
          
          <div className="flex-1">
<h3 className="text-xl font-bold text-gray-900 mb-1">
              {business.Name}
            </h3>
<p className="text-gray-600 text-sm leading-relaxed">
              {business.address}
            </p>
          </div>
        </div>

        <Badge variant="success" size="sm">
          Active
        </Badge>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <StarRating rating={business.rating} size={20} />
<span className="text-sm text-gray-500">
            {business.total_reviews} reviews
          </span>
        </div>
        
<div className="text-xs text-gray-400">
          Place ID: {business.place_id?.substring(0, 10)}...
        </div>
      </div>

      <div className="flex items-center justify-between">
<div className="text-sm text-gray-500">
          Last updated: {new Date(business.last_fetched).toLocaleDateString()}
        </div>
        
        <Button
          onClick={handleCreateWidget}
          variant="primary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Code" size={16} />
          <span>Create Widget</span>
        </Button>
      </div>
    </motion.div>
  )
}

export default BusinessCard