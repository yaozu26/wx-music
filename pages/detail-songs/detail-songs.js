import recommendStore from '../../stores/rankingStore'

Page({
  data: {
    songs: []
  },
  onLoad() {
    recommendStore.onState("recommendSongs", value => {
      this.setData({ songs: value })
    })
  },
  onUnload() {
    recommendStore.offState("recommendSongs", value => {
      this.setData({ songs: value })
    })
  }
})