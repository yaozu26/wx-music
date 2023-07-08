Component({
  properties: {
    itemData: {
      type: Object,
      defaulr: () => {}
    }
  },
  methods: {
    onItemTap() {
      const item = this.properties.itemData

      wx.navigateTo({
        url: `/pages/detail-vedio/detail-vedio?id=${item.id}`,
      })
    }
  }
})