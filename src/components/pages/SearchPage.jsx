import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SearchForm from '@/components/molecules/SearchForm'
import BusinessCard from '@/components/molecules/BusinessCard'
import ReviewsList from '@/components/organisms/ReviewsList'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import businessService from '@/services/api/businessService'
import reviewService from '@/services/api/reviewService'

const SearchPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)

  const handleSearch = async (searchData) => {
    setLoading(true)
    setError(null)
    setBusiness(null)
    setReviews([])

    try {
      let foundBusiness

      if (searchData.type === 'business') {
        foundBusiness = await businessService.searchByName(
          searchData.businessName,
          searchData.address
        )
      } else {
        foundBusiness = await businessService.searchByUrl(searchData.url)
      }

      if (foundBusiness) {
        setBusiness(foundBusiness)
        
        // Fetch reviews for the business
const businessReviews = await reviewService.getByBusinessId(foundBusiness.Id)
        setReviews(businessReviews)
        
        toast.success(`Found ${foundBusiness.name} with ${businessReviews.length} reviews`)
      }
    } catch (err) {
      setError(err.message)
      toast.error('Failed to search for business')
    } finally {
      setLoading(false)
    }
  }

const handleCreateWidget = (business) => {
    navigate(`/widget/${business.Id}`)
  }

  const handleRetry = () => {
    setError(null)
    setBusiness(null)
    setReviews([])
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full blur-xl opacity-20 animate-pulse" />
          <div className="relative bg-white p-6 rounded-full shadow-card-hover inline-block">
            <ApperIcon name="Star" size={48} className="text-primary-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4">
          ReviewSync
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your Google Reviews into beautiful, embeddable widgets for your website. 
          Search for your business and create stunning review displays in minutes.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Zap" size={16} className="text-warning-500" />
            <span>Instant Setup</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Shield" size={16} className="text-success-500" />
            <span>Secure & Reliable</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Smartphone" size={16} className="text-info-500" />
            <span>Mobile Responsive</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search Form */}
        <div>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        <div>
          {loading && <Loading type="business" />}
          
          {error && (
            <Error
              message={error}
              onRetry={handleRetry}
              type="search"
            />
          )}
          
          {!loading && !error && !business && (
            <Empty
              type="search"
              onAction={() => {}}
              actionLabel="Enter search details"
            />
          )}
          
          {business && !loading && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BusinessCard
                business={business}
                onCreateWidget={handleCreateWidget}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && !loading && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ReviewsList reviews={reviews} business={business} />
        </motion.div>
      )}

      {/* Features Section */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[
          {
            icon: 'Search',
            title: 'Smart Search',
            description: 'Find your business using name/address or Google Maps URL'
          },
          {
            icon: 'Palette',
            title: 'Custom Themes',
            description: 'Choose from multiple themes and customize colors to match your brand'
          },
          {
            icon: 'Code',
            title: 'Easy Embed',
            description: 'Copy and paste the generated code into your website - no coding required'
          }
        ].map((feature, index) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name={feature.icon} size={32} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default SearchPage