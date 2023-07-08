import { getMusicPlaylistDetail } from '../../services/music'

Page({
  data: {
    id: "",
    playlistData: {}
  },
  onLoad(options) {
    this.data.id = options.id
    this.fetchDetailHotData()
  },


  // 请求数据
  async fetchDetailHotData() {
    const res = await getMusicPlaylistDetail(this.data.id)
    this.setData({ playlistData: res.playlist })
  }
})