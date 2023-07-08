Component({
  properties: {
    hotSongItem: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    onHotItemClick() {
      const id = this.properties.hotSongItem.id
      wx.navigateTo({
        url: `/pages/detail-hot/detail-hot?id=${id}`,
      })
    }
  }
})