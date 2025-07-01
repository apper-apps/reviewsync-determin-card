import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBX-ZM63hiL-n6Tuxv2AMesE6ckYSCoVk8';
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const googlePlacesService = {
  async textSearch(query, location = '') {
    try {
      const searchQuery = location ? `${query} ${location}` : query;
      
      const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/textsearch/json`, {
        params: {
          query: searchQuery,
          key: GOOGLE_PLACES_API_KEY,
          fields: 'place_id,name,formatted_address,rating,user_ratings_total,geometry'
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API Error: ${response.data.status}`);
      }

      return response.data.results || [];
    } catch (error) {
      console.error('Error in Google Places text search:', error);
      throw error;
    }
  },

  async getPlaceDetails(placeId) {
    try {
      const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/details/json`, {
        params: {
          place_id: placeId,
          key: GOOGLE_PLACES_API_KEY,
          fields: 'place_id,name,formatted_address,rating,user_ratings_total,reviews,photos'
        }
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API Error: ${response.data.status}`);
      }

      return response.data.result;
    } catch (error) {
      console.error('Error getting place details:', error);
      throw error;
    }
  },

  async getReviews(placeId) {
    try {
      const placeDetails = await this.getPlaceDetails(placeId);
      
      if (!placeDetails.reviews) {
        return [];
      }

      // Return latest 10 reviews with proper formatting
      return placeDetails.reviews.slice(0, 10).map(review => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text || '',
        published_at: new Date(review.time * 1000).toISOString(), // Convert Unix timestamp
        author_photo_url: review.profile_photo_url || null
      }));
    } catch (error) {
      console.error('Error fetching reviews from Google Places:', error);
      throw error;
    }
  },

  formatBusinessData(googlePlace) {
    return {
      Name: googlePlace.name,
      place_id: googlePlace.place_id,
      address: googlePlace.formatted_address || '',
      rating: googlePlace.rating || 0,
      total_reviews: googlePlace.user_ratings_total || 0,
      last_fetched: new Date().toISOString()
    };
  }
};

export default googlePlacesService;