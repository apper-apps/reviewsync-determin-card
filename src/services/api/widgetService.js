const widgetService = {
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
          { field: { Name: "theme" } },
          { field: { Name: "settings" } },
          { field: { Name: "embed_code" } }
        ]
      };

      const response = await apperClient.fetchRecords('widget', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching widgets:", error);
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
          { field: { Name: "theme" } },
          { field: { Name: "settings" } },
          { field: { Name: "embed_code" } }
        ]
      };

      const response = await apperClient.getRecordById('widget', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching widget with ID ${id}:`, error);
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
          { field: { Name: "theme" } },
          { field: { Name: "settings" } },
          { field: { Name: "embed_code" } }
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

      const response = await apperClient.fetchRecords('widget', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching widgets by business ID:", error);
      throw error;
    }
  },

  async create(widgetData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Generate embed code
      const widgetId = `reviewsync-widget-${Date.now()}`;
      const config = {
        businessId: widgetData.business_id,
        ...widgetData.settings
      };

      const embedCode = `<!-- ReviewSync Widget -->
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
</script>`;

      // Only include Updateable fields
      const params = {
        records: [{
          business_id: widgetData.business_id,
          theme: widgetData.theme || 'card',
          settings: JSON.stringify(widgetData.settings || {}),
          embed_code: widgetData.embed_code || embedCode
        }]
      };

      const response = await apperClient.createRecord('widget', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} widgets:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      console.error("Error creating widget:", error);
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
      if (updateData.theme !== undefined) updateRecord.theme = updateData.theme;
      if (updateData.settings !== undefined) {
        updateRecord.settings = typeof updateData.settings === 'string' 
          ? updateData.settings 
          : JSON.stringify(updateData.settings);
      }
      if (updateData.embed_code !== undefined) updateRecord.embed_code = updateData.embed_code;

      // Regenerate embed code if settings or theme changed
      if (updateData.settings || updateData.theme) {
        const widgetId = `reviewsync-widget-${id}`;
        const config = {
          businessId: updateData.business_id,
          theme: updateData.theme,
          ...updateData.settings
        };

        const embedCode = `<!-- ReviewSync Widget -->
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
</script>`;

        updateRecord.embed_code = embedCode;
      }

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('widget', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} widgets:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      console.error("Error updating widget:", error);
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

      const response = await apperClient.deleteRecord('widget', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} widgets:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting widget:", error);
      throw error;
    }
  }
}

export default widgetService