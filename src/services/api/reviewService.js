import reviews from '@/services/mockData/reviews.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const reviewService = {
  async getAll() {
    await delay(300)
    return [...reviews]
  },

  async getById(id) {
    await delay(200)
    const review = reviews.find(r => r.Id === id)
    return review ? { ...review } : null
  },

  async getByBusinessId(businessId) {
    await delay(400)
    const businessReviews = reviews.filter(r => r.businessId === businessId)
    return businessReviews.map(r => ({ ...r }))
  },

  async refresh(businessId) {
    await delay(800)
    
    // Simulate fetching fresh reviews from Google Places API
    const existingReviews = reviews.filter(r => r.businessId === businessId)
    
    // Add some new mock reviews (simulate new reviews being posted)
    const authors = ['Alex Smith', 'Jamie Taylor', 'Morgan Lee', 'Casey Jordan', 'Riley Parker']
    const sampleTexts = [
      'Great experience! Highly recommend.',
      'Excellent service and quality.',
      'Professional and reliable.',
      'Very satisfied with the results.',
      'Outstanding customer service!'
    ]
    
    const newReviews = []
    const numNewReviews = Math.floor(Math.random() * 3)
    
    for (let i = 0; i < numNewReviews; i++) {
      const newId = Math.max(...reviews.map(r => r.Id)) + 1 + i
      const newReview = {
        Id: newId,
        businessId: businessId,
        authorName: authors[Math.floor(Math.random() * authors.length)],
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        publishedAt: new Date().toISOString(),
        authorPhotoUrl: null
      }
      
      reviews.push(newReview)
      newReviews.push(newReview)
    }
    
    // Return all reviews for the business including new ones
    const allBusinessReviews = reviews.filter(r => r.businessId === businessId)
    return allBusinessReviews.map(r => ({ ...r }))
  },

  async create(reviewData) {
    await delay(300)
    const newId = Math.max(...reviews.map(r => r.Id)) + 1
    const newReview = {
      Id: newId,
      ...reviewData,
      publishedAt: new Date().toISOString()
    }
    reviews.push(newReview)
    return { ...newReview }
  },

  async update(id, updateData) {
    await delay(250)
    const index = reviews.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    
    reviews[index] = { ...reviews[index], ...updateData }
    return { ...reviews[index] }
  },

  async delete(id) {
    await delay(200)
    const index = reviews.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    
    const deleted = { ...reviews[index] }
    reviews.splice(index, 1)
    return deleted
  }
}

export default reviewService