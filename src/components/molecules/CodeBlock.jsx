import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const CodeBlock = ({ code, language = 'html', title = 'Embed Code' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const formatCode = (code) => {
    return code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(&lt;\/?[^&\s]*)/g, '<span class="tag">$1</span>')
      .replace(/([\w-]+)=/g, '<span class="attr-name">$1</span>=')
      .replace(/="([^"]*)"/g, '="<span class="attr-value">$1</span>"')
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, '<span class="comment">$&</span>')
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <ApperIcon name="Code" size={20} />
          <span>{title}</span>
        </h3>
        
        <Button
          onClick={handleCopy}
          variant="secondary"
          size="sm"
          className={`btn-copy ${copied ? 'copied' : ''}`}
        >
          {copied ? (
            <>
              <ApperIcon name="Check" size={16} className="mr-2" />
              Copied!
            </>
          ) : (
            <>
              <ApperIcon name="Copy" size={16} className="mr-2" />
              Copy Code
            </>
          )}
        </Button>
      </div>

      <div className="relative">
        <pre className="code-block">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: formatCode(code) 
            }} 
          />
        </pre>
      </div>

      <div className="mt-4 p-4 bg-info-50 rounded-lg border border-info-200">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" size={16} className="text-info-500 mt-0.5" />
          <div className="text-sm">
            <p className="text-info-800 font-medium mb-1">Implementation Instructions</p>
            <ul className="text-info-700 space-y-1 text-xs">
              <li>• Copy the code above and paste it into your website's HTML</li>
              <li>• The widget will automatically load and display your reviews</li>
              <li>• The widget is responsive and will adapt to your page's styling</li>
              <li>• Reviews are cached and updated periodically for performance</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CodeBlock