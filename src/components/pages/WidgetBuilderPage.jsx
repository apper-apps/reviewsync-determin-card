import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import WidgetPreview from '@/components/molecules/WidgetPreview'
import WidgetCustomizer from '@/components/organisms/WidgetCustomizer'
import CodeBlock from '@/components/molecules/CodeBlock'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import ErrorComponent from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import businessService from '@/services/api/businessService'
import reviewService from '@/services/api/reviewService'
import widgetService from '@/services/api/widgetService'

const WidgetBuilderPage = () => {
  const { businessId } = useParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [settings, setSettings] = useState({
    theme: 'card',
    maxReviews: 3,
    minRating: 1,
    showBusinessInfo: true,
    showDates: true,
    accentColor: '#1a73e8'
  })
  const [embedCode, setEmbedCode] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [businessId])

  useEffect(() => {
    generateEmbedCode()
  }, [business, settings])

const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

// Enhanced validation for businessId parameter
      if (!businessId || businessId === '' || typeof businessId !== 'string') {
        throw new Error('Invalid business ID provided. Please check the URL and try again.')
      }

      const parsedBusinessId = parseInt(businessId, 10)
      if (isNaN(parsedBusinessId) || parsedBusinessId <= 0 || parsedBusinessId.toString() !== businessId.trim()) {
        throw new Error('Business ID must be a valid positive integer. Please check the URL and try again.')
      }

      // Fetch business data
      const businessData = await businessService.getById(parsedBusinessId)
      if (!businessData) {
        throw new Error(`Business with ID ${businessId} not found. The business may have been deleted or the ID is incorrect.`)
      }

      // Fetch reviews data
      const reviewsData = await reviewService.getByBusinessId(parsedBusinessId)
      
      setBusiness(businessData)
      setReviews(reviewsData || [])
    } catch (err) {
      console.error('Error loading widget builder data:', err)
      setError(err.message || 'Failed to load business data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateEmbedCode = () => {
    if (!business) return

const widgetId = `reviewsync-widget-${business.Id}`
    const config = {
businessId: business.Id,
      placeId: business.place_id,
      ...settings
    }

    const code = `<!-- ReviewSync Widget -->
<div id="${widgetId}"></div>
<script>
  (function() {
    var config = ${JSON.stringify(config, null, 2)};
    var script = document.createElement('script');
    script.src = 'https://cdn.reviewsync.com/widget.js';
    script.onload = function() {
      ReviewSyncWidget.init('${widgetId}', config);
    };
    document.head.appendChild(script);
  })();
</script>`

    setEmbedCode(code)
  }

const handleSaveWidget = async () => {
    try {
      setSaving(true)
      
      const widgetData = {
        business_id: parseInt(businessId),
        theme: settings.theme,
        settings: settings,
        embed_code: embedCode
      }

      await widgetService.create(widgetData)
      toast.success('Widget saved successfully!')
    } catch (err) {
      console.error('Error saving widget:', err)
      toast.error(err.message || 'Failed to save widget')
    } finally {
      setSaving(false)
    }
  }

  const handleRefreshReviews = async () => {
    try {
      setLoading(true)
      const refreshedReviews = await reviewService.refresh(parseInt(businessId))
      setReviews(refreshedReviews)
      toast.success('Reviews refreshed successfully!')
    } catch (err) {
      toast.error('Failed to refresh reviews')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading type="business" />
  }

  if (error) {
return (
      <ErrorComponent
        message={error}
        onRetry={loadData}
        type="general"
      />
    )
  }

  if (!business) {
return (
      <ErrorComponent
        message="Business not found"
        onRetry={() => navigate('/search')}
        type="general"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Button
                onClick={() => navigate('/search')}
                variant="ghost"
                size="sm"
              >
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                Back to Search
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
Widget Builder
            </h1>
            <p className="text-gray-600 mt-1">
Customize your review widget for <span className="font-medium">{business.Name}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleRefreshReviews}
              variant="secondary"
              size="sm"
            >
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Refresh Reviews
            </Button>
            
            <Button
              onClick={handleSaveWidget}
              variant="success"
              loading={saving}
            >
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Widget
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customization Panel */}
        <div className="lg:col-span-1">
          <WidgetCustomizer
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>

        {/* Preview and Code */}
        <div className="lg:col-span-2 space-y-8">
          {/* Preview */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <ApperIcon name="Eye" size={24} className="text-primary-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Widget Preview
              </h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <WidgetPreview
                business={business}
                reviews={reviews}
                theme={settings.theme}
                settings={settings}
              />
            </div>

            <div className="mt-6 p-4 bg-info-50 rounded-lg border border-info-200">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" size={16} className="text-info-500 mt-0.5" />
                <div className="text-sm">
                  <p className="text-info-800 font-medium mb-1">Preview Note</p>
                  <p className="text-info-700">
                    This is how your widget will appear on your website. 
                    The widget is fully responsive and will adapt to your page's styling.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Embed Code */}
          <CodeBlock
            code={embedCode}
            title="Embed Code"
          />

          {/* Widget Stats */}
          <motion.div
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ApperIcon name="BarChart3" size={20} />
              <span>Widget Statistics</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {reviews.length}
                </div>
                <div className="text-sm text-primary-700">Total Reviews</div>
              </div>
              
              <div className="text-center p-4 bg-success-50 rounded-lg">
                <div className="text-2xl font-bold text-success-600">
{business.rating}
                </div>
                <div className="text-sm text-success-700">Average Rating</div>
              </div>
              
              <div className="text-center p-4 bg-warning-50 rounded-lg">
                <div className="text-2xl font-bold text-warning-600">
                  {reviews.filter(r => r.rating >= settings.minRating).length}
                </div>
                <div className="text-sm text-warning-700">Filtered Reviews</div>
              </div>
              
              <div className="text-center p-4 bg-info-50 rounded-lg">
                <div className="text-2xl font-bold text-info-600">
                  {Math.min(settings.maxReviews, reviews.filter(r => r.rating >= settings.minRating).length)}
                </div>
                <div className="text-sm text-info-700">Displayed Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WidgetBuilderPage