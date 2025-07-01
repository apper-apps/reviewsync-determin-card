import widgets from '@/services/mockData/widgets.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const widgetService = {
  async getAll() {
    await delay(300)
    return [...widgets]
  },

  async getById(id) {
    await delay(200)
    const widget = widgets.find(w => w.Id === id)
    return widget ? { ...widget } : null
  },

  async getByBusinessId(businessId) {
    await delay(250)
    const businessWidgets = widgets.filter(w => w.businessId === businessId)
    return businessWidgets.map(w => ({ ...w }))
  },

  async create(widgetData) {
    await delay(400)
    const newId = Math.max(...widgets.map(w => w.Id)) + 1
    
    // Generate embed code
    const widgetId = `reviewsync-widget-${newId}`
    const config = {
      businessId: widgetData.businessId,
      placeId: widgetData.placeId || `place-id-${widgetData.businessId}`,
      ...widgetData.settings
    }

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
</script>`

    const newWidget = {
      Id: newId,
      businessId: widgetData.businessId,
      theme: widgetData.theme || 'card',
      settings: widgetData.settings || {},
      embedCode: widgetData.embedCode || embedCode
    }
    
    widgets.push(newWidget)
    return { ...newWidget }
  },

  async update(id, updateData) {
    await delay(300)
    const index = widgets.findIndex(w => w.Id === id)
    if (index === -1) {
      throw new Error('Widget not found')
    }
    
    // Regenerate embed code if settings changed
    if (updateData.settings || updateData.theme) {
      const widgetId = `reviewsync-widget-${id}`
      const config = {
        businessId: widgets[index].businessId,
        placeId: `place-id-${widgets[index].businessId}`,
        theme: updateData.theme || widgets[index].theme,
        ...widgets[index].settings,
        ...updateData.settings
      }

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
</script>`

      updateData.embedCode = embedCode
    }
    
    widgets[index] = { ...widgets[index], ...updateData }
    return { ...widgets[index] }
  },

  async delete(id) {
    await delay(200)
    const index = widgets.findIndex(w => w.Id === id)
    if (index === -1) {
      throw new Error('Widget not found')
    }
    
    const deleted = { ...widgets[index] }
    widgets.splice(index, 1)
    return deleted
  }
}

export default widgetService