Component({
  properties: {
    itemData: {
      type: Object,
      default: () => {}
    },
    sort: {
      type: Number,
      default: () => 0
    }
  },

  data: {
    ar: ""
  },

  attached() {
    const ars = this.properties.itemData.ar.map(item => item.name)
    const ar = ars.join("/")
    this.setData({ar})
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