import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import Empty from '@/components/ui/Empty';
import Error from '@/components/ui/Error';
import TestimonialForm from '@/components/organisms/TestimonialForm';
import customReviewService from '@/services/api/customReviewService';
import businessService from '@/services/api/businessService';
import StarRating from '@/components/molecules/StarRating';
import { formatDistanceToNow } from 'date-fns';

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState('');

  // Load testimonials and businesses on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [testimonialsData, businessesData] = await Promise.all([
        customReviewService.getAll(),
        businessService.getAll()
      ]);
      
      setTestimonials(testimonialsData);
      setBusinesses(businessesData);
    } catch (err) {
      setError("Failed to load data");
      console.error("Error loading testimonials data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestimonial = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const success = await customReviewService.delete(id);
    if (success) {
      setTestimonials(prev => prev.filter(t => t.Id !== id));
    }
  };

  const handleFormSubmit = async (testimonialData) => {
    let result;
    
    if (editingTestimonial) {
      result = await customReviewService.update(editingTestimonial.Id, testimonialData);
      if (result) {
        setTestimonials(prev => prev.map(t => 
          t.Id === editingTestimonial.Id ? { ...t, ...result } : t
        ));
      }
    } else {
      result = await customReviewService.create(testimonialData);
      if (result) {
        setTestimonials(prev => [result, ...prev]);
      }
    }

    if (result) {
      setShowForm(false);
      setEditingTestimonial(null);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTestimonial(null);
  };

  // Filter testimonials based on search and business selection
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = !searchTerm || 
      testimonial.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.reviewtext?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.profession?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBusiness = !selectedBusiness || 
      testimonial.business_id?.toString() === selectedBusiness;
    
    return matchesSearch && matchesBusiness;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
            <p className="text-muted-foreground mt-2">
              Manage your custom testimonials and reviews
            </p>
          </div>
          <Button
            onClick={handleCreateTestimonial}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={20} />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Search testimonials"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by author, content, or profession..."
              icon="Search"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Filter by Business
            </label>
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            >
              <option value="">All Businesses</option>
              {businesses.map(business => (
                <option key={business.Id} value={business.Id.toString()}>
                  {business.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedBusiness('');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <TestimonialForm
              testimonial={editingTestimonial}
              businesses={businesses}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Testimonials List */}
      {filteredTestimonials.length === 0 ? (
        <Empty
          title="No testimonials found"
          description={searchTerm || selectedBusiness ? 
            "No testimonials match your current filters." : 
            "Start by creating your first testimonial."
          }
          action={
            <Button onClick={handleCreateTestimonial}>
              <ApperIcon name="Plus" size={20} className="mr-2" />
              Add First Testimonial
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              {/* Testimonial Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">
                    {testimonial.author}
                  </h3>
                  {testimonial.profession && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position ? `${testimonial.position} • ` : ''}
                      {testimonial.profession}
                    </p>
                  )}
                  {testimonial.website && (
                    <p className="text-sm text-primary">
                      {testimonial.website}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(testimonial.Id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={testimonial.rating} readonly />
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.reviewtext}"
              </p>

              {/* Meta Information */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {testimonial.reviewdate && 
                      formatDistanceToNow(new Date(testimonial.reviewdate), { addSuffix: true })
                    }
                  </span>
                  {testimonial.istestimonial && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      Testimonial
                    </span>
                  )}
                </div>
                {businesses.find(b => b.Id === testimonial.business_id) && (
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">
                      Business: {businesses.find(b => b.Id === testimonial.business_id)?.Name}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {filteredTestimonials.length} of {testimonials.length} testimonials
      </div>
    </div>
  );
}

export default TestimonialsPage;