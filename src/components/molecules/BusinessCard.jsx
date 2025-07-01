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
      className="group bg-card border border-border rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 p-6 hover:border-border/80"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <ApperIcon name="Building2" size={28} className="text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-card-foreground mb-2 truncate">
              {business.Name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {business.address}
            </p>
          </div>
        </div>

        <Badge variant="success" size="sm" className="shrink-0 ml-4">
          Active
        </Badge>
      </div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center space-x-4">
          <StarRating rating={business.rating} size={18} />
          <span className="text-sm text-muted-foreground font-medium">
            {business.total_reviews} reviews
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
          ID: {business.place_id?.substring(0, 8)}...
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Updated {new Date(business.last_fetched).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        
        <Button
          onClick={handleCreateWidget}
          variant="default"
          size="sm"
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-button hover:shadow-button-hover transition-all duration-200"
        >
          <ApperIcon name="Code" size={16} />
          <span>Create Widget</span>
        </Button>
      </div>
    </motion.div>
  )
}

export default BusinessCard