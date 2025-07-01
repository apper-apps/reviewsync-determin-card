import React from 'react'

const Select = ({
  label,
  error,
  helpText,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      
      <select
        className={`form-select ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      
      {error && (
        <p className="text-sm text-error-600 mt-1">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  )
}

export default Select