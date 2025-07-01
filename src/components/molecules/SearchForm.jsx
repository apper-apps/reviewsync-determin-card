import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const SearchForm = ({ onSearch, loading = false }) => {
  const [searchType, setSearchType] = useState('business')
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [googleUrl, setGoogleUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (searchType === 'business') {
      if (!businessName.trim()) return
      onSearch({
        type: 'business',
        businessName: businessName.trim(),
        address: address.trim()
      })
    } else {
      if (!googleUrl.trim()) return
      onSearch({
        type: 'url',
        url: googleUrl.trim()
      })
    }
  }

  const isValid = searchType === 'business' ? businessName.trim() : googleUrl.trim()

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Find Your Business Reviews
        </h2>
        <p className="text-gray-600">
          Search by business name and address, or paste a Google Maps URL
        </p>
      </div>

      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setSearchType('business')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              searchType === 'business'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ApperIcon name="Building2" size={16} className="inline mr-2" />
            Business Name
          </button>
          <button
            type="button"
            onClick={() => setSearchType('url')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              searchType === 'url'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ApperIcon name="Link" size={16} className="inline mr-2" />
            Google Maps URL
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {searchType === 'business' ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="business-form"
          >
            <Input
              label="Business Name"
              placeholder="e.g., Joe's Coffee Shop"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
            
            <Input
              label="Address (Optional)"
              placeholder="e.g., 123 Main St, Austin, TX 78701"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helpText="Adding an address helps us find the exact location"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="url-form"
          >
            <Input
              label="Google Maps URL"
              placeholder="https://maps.app.goo.gl/..."
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              helpText="Paste the shareable Google Maps link for your business"
              required
            />
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid}
          loading={loading}
          className="w-full"
        >
          {loading ? (
            'Searching...'
          ) : (
            <>
              <ApperIcon name="Search" size={20} className="mr-2" />
              Search Reviews
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-info-50 rounded-lg border border-info-200">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" size={20} className="text-info-500 mt-0.5" />
          <div className="text-sm">
            <p className="text-info-800 font-medium mb-1">Quick Tip</p>
            <p className="text-info-700">
              For best results, use the exact business name as it appears on Google Maps. 
              You can also get the Google Maps URL by clicking "Share" on any business listing.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchForm