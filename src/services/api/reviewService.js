const reviewService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { name: "business_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "author_name" } },
          { field: { Name: "rating" } },
          { field: { Name: "text" } },
          { field: { Name: "published_at" } },
          { field: { Name: "author_photo_url" } }
        ]
      };

      const response = await apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { name: "business_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "author_name" } },
          { field: { Name: "rating" } },
          { field: { Name: "text" } },
          { field: { Name: "published_at" } },
          { field: { Name: "author_photo_url" } }
        ]
      };

      const response = await apperClient.getRecordById('review', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching review with ID ${id}:`, error);
      return null;
    }
  },

  async getByBusinessId(businessId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { name: "business_id" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "author_name" } },
          { field: { Name: "rating" } },
          { field: { Name: "text" } },
          { field: { Name: "published_at" } },
          { field: { Name: "author_photo_url" } }
        ],
        where: [
          {
            FieldName: "business_id",
            Operator: "EqualTo",
            Values: [businessId],
            Include: true
          }
        ]
      };

      const response = await apperClient.fetchRecords('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching reviews by business ID:", error);
      throw error;
    }
  },


  async create(reviewData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          business_id: reviewData.business_id,
          author_name: reviewData.author_name,
          rating: reviewData.rating,
          text: reviewData.text,
          published_at: reviewData.published_at || new Date().toISOString(),
          author_photo_url: reviewData.author_photo_url
        }]
      };

      const response = await apperClient.createRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} reviews:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const updateRecord = { Id: id };
      if (updateData.business_id !== undefined) updateRecord.business_id = updateData.business_id;
      if (updateData.author_name !== undefined) updateRecord.author_name = updateData.author_name;
      if (updateData.rating !== undefined) updateRecord.rating = updateData.rating;
      if (updateData.text !== undefined) updateRecord.text = updateData.text;
      if (updateData.published_at !== undefined) updateRecord.published_at = updateData.published_at;
      if (updateData.author_photo_url !== undefined) updateRecord.author_photo_url = updateData.author_photo_url;

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} reviews:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('review', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} reviews:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }
}

export default reviewService