import businesses from '@/services/mockData/businesses.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const businessService = {
  async getAll() {
    await delay(300)
    return [...businesses]
  },

  async getById(id) {
    await delay(200)
    const business = businesses.find(b => b.Id === id)
    return business ? { ...business } : null
  },

  async searchByName(businessName, address = '') {
    await delay(500)
    
    // Simulate API search - in real app this would call Google Places API
    const searchTerms = businessName.toLowerCase()
    const addressTerms = address.toLowerCase()
    
    let foundBusiness = businesses.find(b => 
      b.name.toLowerCase().includes(searchTerms) ||
      (addressTerms && b.address.toLowerCase().includes(addressTerms))
    )
    
    // If no match found, create a mock business result
    if (!foundBusiness) {
      const newId = Math.max(...businesses.map(b => b.Id)) + 1
      foundBusiness = {
        Id: newId,
        placeId: `ChIJ${Math.random().toString(36).substr(2, 20)}`,
        name: businessName,
        address: address || `123 Unknown St, Austin, TX 78701`,
        rating: 4.0 + Math.random() * 1,
        totalReviews: Math.floor(Math.random() * 100) + 10,
        lastFetched: new Date().toISOString()
      }
      
      // Add to mock data for persistence during session
      businesses.push(foundBusiness)
    }
    
    return foundBusiness ? { ...foundBusiness } : null
  },

  async searchByUrl(googleMapsUrl) {
    await delay(400)
    
    // Extract place ID from Google Maps URL (simplified)
    const placeIdMatch = googleMapsUrl.match(/place\/([^\/]+)/) || 
                        googleMapsUrl.match(/maps\/place\/([^\/]+)/) ||
                        googleMapsUrl.match(/data=.*!3m1!4b1!4m\d+!3m\d+!1s([^!]+)/)
    
    if (placeIdMatch) {
      // Try to find existing business by place ID or create new one
      let foundBusiness = businesses.find(b => 
        b.placeId === placeIdMatch[1] || 
        b.name.toLowerCase().includes(placeIdMatch[1].toLowerCase().replace(/[+_]/g, ' '))
      )
      
      if (!foundBusiness) {
        const newId = Math.max(...businesses.map(b => b.Id)) + 1
        foundBusiness = {
          Id: newId,
          placeId: placeIdMatch[1],
          name: 'Business from Maps URL',
          address: '123 Maps Location, Austin, TX 78701',
          rating: 4.0 + Math.random() * 1,
          totalReviews: Math.floor(Math.random() * 100) + 10,
          lastFetched: new Date().toISOString()
        }
        
        businesses.push(foundBusiness)
      }
      
      return { ...foundBusiness }
    }
    
    throw new Error('Invalid Google Maps URL')
  },

  async create(businessData) {
    await delay(300)
    const newId = Math.max(...businesses.map(b => b.Id)) + 1
    const newBusiness = {
      Id: newId,
      ...businessData,
      lastFetched: new Date().toISOString()
    }
    businesses.push(newBusiness)
    return { ...newBusiness }
  },

  async update(id, updateData) {
    await delay(250)
    const index = businesses.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error('Business not found')
    }
    
    businesses[index] = { ...businesses[index], ...updateData }
    return { ...businesses[index] }
  },

  async delete(id) {
    await delay(200)
    const index = businesses.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error('Business not found')
    }
    
    const deleted = { ...businesses[index] }
    businesses.splice(index, 1)
    return deleted
  }
}

export default businessService