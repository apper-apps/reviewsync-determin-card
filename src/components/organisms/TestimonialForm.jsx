import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import StarRating from '@/components/molecules/StarRating';

function TestimonialForm({ testimonial, businesses, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    author: '',
    reviewtext: '',
    rating: 5,
    reviewdate: '',
    website: '',
    profession: '',
    position: '',
    business_id: '',
    istestimonial: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (testimonial) {
      setFormData({
        author: testimonial.author || '',
        reviewtext: testimonial.reviewtext || '',
        rating: testimonial.rating || 5,
        reviewdate: testimonial.reviewdate ? testimonial.reviewdate.split('T')[0] : '',
        website: testimonial.website || '',
        profession: testimonial.profession || '',
        position: testimonial.position || '',
        business_id: testimonial.business_id?.toString() || '',
        istestimonial: testimonial.istestimonial !== undefined ? testimonial.istestimonial : true
      });
    } else {
      // Set default date to today for new testimonials
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, reviewdate: today }));
    }
  }, [testimonial]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.reviewtext.trim()) {
      newErrors.reviewtext = 'Review text is required';
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5 stars';
    }

    if (!formData.reviewdate) {
      newErrors.reviewdate = 'Review date is required';
    }

    if (!formData.business_id) {
      newErrors.business_id = 'Please select a business';
    }

    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string.startsWith('http') ? string : `https://${string}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format the website URL
      let websiteUrl = formData.website;
      if (websiteUrl && !websiteUrl.startsWith('http')) {
        websiteUrl = `https://${websiteUrl}`;
      }

      const submitData = {
        ...formData,
        website: websiteUrl,
        business_id: parseInt(formData.business_id),
        rating: parseInt(formData.rating)
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          <ApperIcon name="X" size={16} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Author Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Author Name *"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            error={errors.author}
            placeholder="Enter the reviewer's name"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Business *
            </label>
            <select
              name="business_id"
              value={formData.business_id}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background ${
                errors.business_id ? 'border-destructive' : 'border-border'
              }`}
              required
            >
              <option value="">Select a business</option>
              {businesses.map(business => (
                <option key={business.Id} value={business.Id.toString()}>
                  {business.Name}
                </option>
              ))}
            </select>
            {errors.business_id && (
              <p className="mt-1 text-sm text-destructive">{errors.business_id}</p>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            error={errors.profession}
            placeholder="e.g., Software Engineer, CEO"
          />
          
          <Input
            label="Position/Title"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            error={errors.position}
            placeholder="e.g., Senior Developer, Founder"
          />
        </div>

        {/* Website */}
        <Input
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          error={errors.website}
          placeholder="e.g., example.com or https://example.com"
        />

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Rating *
          </label>
          <StarRating 
            rating={formData.rating} 
            onRatingChange={handleRatingChange}
            size="lg"
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-destructive">{errors.rating}</p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Review Text *
          </label>
          <textarea
            name="reviewtext"
            value={formData.reviewtext}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none ${
              errors.reviewtext ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Enter the testimonial text..."
            required
          />
          {errors.reviewtext && (
            <p className="mt-1 text-sm text-destructive">{errors.reviewtext}</p>
          )}
        </div>

        {/* Review Date */}
        <Input
          label="Review Date *"
          name="reviewdate"
          type="date"
          value={formData.reviewdate}
          onChange={handleInputChange}
          error={errors.reviewdate}
          required
        />

        {/* Testimonial Flag */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="istestimonial"
            name="istestimonial"
            checked={formData.istestimonial}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="istestimonial" className="ml-2 text-sm text-foreground">
            Mark as testimonial (will be available for widgets)
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" size={16} />
                {testimonial ? 'Update' : 'Create'} Testimonial
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TestimonialForm;