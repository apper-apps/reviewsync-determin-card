// Centralized compression/decompression functions for widget settings
const compressSettings = (settings) => {
  if (!settings || typeof settings !== 'object') return '{}';
  
  const compressed = {};
  const mapping = {
    theme: 't',
    maxReviews: 'mr',
    minRating: 'mnr',
    showBusinessInfo: 'sbi',
    showDates: 'sd',
    accentColor: 'ac',
    borderStyle: 'bs',
    borderWidth: 'bw',
    paddingTop: 'pt',
    paddingRight: 'pr',
    paddingBottom: 'pb',
    paddingLeft: 'pl',
    borderRadius: 'br',
    backgroundColor: 'bg',
    textColor: 'tc',
    fontFamily: 'ff',
    fontSize: 'fs',
    fontWeight: 'fw',
    lineHeight: 'lh',
    alignment: 'al',
    aspectRatio: 'ar',
    columnsDesktop: 'cd',
    columnsMobile: 'cm',
    animationStyle: 'as'
  };
  
  Object.keys(settings).forEach(key => {
    const shortKey = mapping[key] || key.substring(0, 3);
    let value = settings[key];
    
    // Convert booleans to numbers for space efficiency
    if (typeof value === 'boolean') {
      value = value ? 1 : 0;
    }
    
    compressed[shortKey] = value;
  });
  
  const result = JSON.stringify(compressed).replace(/\s/g, '');
  
  // Validate compressed size doesn't exceed database limit
  if (result.length > 255) {
    console.warn(`Compressed settings (${result.length} chars) exceeds 255 limit, applying fallback compression`);
    // Fallback: only include essential settings
    const essential = {
      t: compressed.t || 'card',
      mr: compressed.mr || 3,
      ac: compressed.ac || '#1a73e8'
    };
    const fallbackResult = JSON.stringify(essential);
    if (fallbackResult.length > 255) {
      throw new Error('Settings data too large even after compression');
    }
    return fallbackResult;
  }
  
  return result;
};

const decompressSettings = (compressedSettings) => {
  if (!compressedSettings || compressedSettings === '{}') return {};
  
  try {
    const compressed = JSON.parse(compressedSettings);
    const reverseMapping = {
      t: 'theme',
      mr: 'maxReviews',
      mnr: 'minRating',
      sbi: 'showBusinessInfo',
      sd: 'showDates',
      ac: 'accentColor',
      bs: 'borderStyle',
      bw: 'borderWidth',
      pt: 'paddingTop',
      pr: 'paddingRight',
      pb: 'paddingBottom',
      pl: 'paddingLeft',
      br: 'borderRadius',
      bg: 'backgroundColor',
      tc: 'textColor',
      ff: 'fontFamily',
      fs: 'fontSize',
      fw: 'fontWeight',
      lh: 'lineHeight',
      al: 'alignment',
      ar: 'aspectRatio',
      cd: 'columnsDesktop',
      cm: 'columnsMobile',
      as: 'animationStyle'
    };
    
    const decompressed = {};
    Object.keys(compressed).forEach(key => {
      const fullKey = reverseMapping[key] || key;
      let value = compressed[key];
      
      // Convert numbers back to booleans for boolean settings
      if (['showBusinessInfo', 'showDates'].includes(fullKey) && (value === 0 || value === 1)) {
        value = value === 1;
      }
      
      decompressed[fullKey] = value;
    });
    
    return decompressed;
  } catch (error) {
    console.error('Error decompressing settings:', error);
    return {};
  }
};

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

      // Decompress settings for each widget
      const widgets = (response.data || []).map(widget => ({
        ...widget,
        settings: decompressSettings(widget.settings)
      }));

      return widgets;
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

      // Decompress settings for the widget
      if (response.data && response.data.settings) {
        response.data.settings = decompressSettings(response.data.settings);
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

      // Decompress settings for each widget
      const widgets = (response.data || []).map(widget => ({
        ...widget,
        settings: decompressSettings(widget.settings)
      }));

      return widgets;
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

      // Create widget record in database with compressed settings
      const params = {
        records: [{
          business_id: widgetData.business_id,
          theme: widgetData.theme || 'card',
          settings: compressSettings(widgetData.settings || {}),
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
          : compressSettings(updateData.settings);
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