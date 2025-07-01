import { toast } from 'react-toastify';

// Create a delay function for consistent API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CustomReviewService {
  constructor() {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'customreview';
  }

  async getAll(businessId = null) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "author" } },
          { field: { Name: "reviewtext" } },
          { field: { Name: "rating" } },
          { field: { Name: "reviewdate" } },
          { field: { Name: "website" } },
          { field: { Name: "profession" } },
          { field: { Name: "position" } },
          { field: { Name: "business_id" } },
          { field: { Name: "istestimonial" } },
          { field: { Name: "CreatedOn" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      // Add business filter if provided
      if (businessId) {
        params.where = [
          {
            FieldName: "business_id",
            Operator: "EqualTo",
            Values: [businessId]
          }
        ];
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching custom reviews:", error);
      toast.error("Failed to fetch testimonials");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "author" } },
          { field: { Name: "reviewtext" } },
          { field: { Name: "rating" } },
          { field: { Name: "reviewdate" } },
          { field: { Name: "website" } },
          { field: { Name: "profession" } },
          { field: { Name: "position" } },
          { field: { Name: "business_id" } },
          { field: { Name: "istestimonial" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching custom review with ID ${id}:`, error);
      toast.error("Failed to fetch testimonial");
      return null;
    }
  }

  async create(reviewData) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: reviewData.author || 'Custom Review',
            author: reviewData.author,
            reviewtext: reviewData.reviewtext,
            rating: parseInt(reviewData.rating),
            reviewdate: reviewData.reviewdate,
            website: reviewData.website,
            profession: reviewData.profession,
            position: reviewData.position,
            business_id: parseInt(reviewData.business_id),
            istestimonial: reviewData.istestimonial !== undefined ? reviewData.istestimonial : true
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Testimonial created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating custom review:", error);
      toast.error("Failed to create testimonial");
      return null;
    }
  }

  async update(id, reviewData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            // Only include Updateable fields
            Name: reviewData.author || 'Custom Review',
            author: reviewData.author,
            reviewtext: reviewData.reviewtext,
            rating: parseInt(reviewData.rating),
            reviewdate: reviewData.reviewdate,
            website: reviewData.website,
            profession: reviewData.profession,
            position: reviewData.position,
            business_id: parseInt(reviewData.business_id),
            istestimonial: reviewData.istestimonial !== undefined ? reviewData.istestimonial : true
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Testimonial updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating custom review:", error);
      toast.error("Failed to update testimonial");
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Testimonial deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting custom review:", error);
      toast.error("Failed to delete testimonial");
      return false;
    }
  }

  async getTestimonialsByBusiness(businessId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "author" } },
          { field: { Name: "reviewtext" } },
          { field: { Name: "rating" } },
          { field: { Name: "reviewdate" } },
          { field: { Name: "website" } },
          { field: { Name: "profession" } },
          { field: { Name: "position" } },
          { field: { Name: "business_id" } },
          { field: { Name: "istestimonial" } }
        ],
        where: [
          {
            FieldName: "business_id",
            Operator: "EqualTo",
            Values: [businessId]
          },
          {
            FieldName: "istestimonial",
            Operator: "EqualTo",
            Values: [true]
          }
        ],
        orderBy: [
          {
            fieldName: "reviewdate",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching testimonials by business:", error);
      return [];
    }
  }
}

// Export a singleton instance
export default new CustomReviewService();