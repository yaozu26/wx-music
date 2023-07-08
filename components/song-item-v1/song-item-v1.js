Component({
  properties: {
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onItemClick() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
    }
  }
})