Component({
  properties: {
    itemData: {
      type: Object,
      default: () => []
    }
  },
  data: {
    tracks: [],
    author: ""
  },
  attached() {
    const trackslist = this.properties.itemData.playlist.tracks
    const tracks = trackslist.slice(0, 3)

    this.setData({ tracks })
  },
  methods: {
    onRankClick() {
      const id = this.properties.itemData.playlist.id
      wx.navigateTo({
        url: `/pages/detail-rank/detail-rank?id=${id}`,
      })
    }
  }
})