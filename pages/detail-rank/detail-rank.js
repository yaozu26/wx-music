import { getMusicPlaylistDetail } from '../../services/music'

Page({
  data: {
    id: "",
    playlistData: {}
  },

  onLoad(options) {
    this.data.id = options.id

    this.fetchMusicData()
  },


  // 请求数据
  async fetchMusicData() {
    const res = await getMusicPlaylistDetail(this.data.id)

    this.setData({ playlistData: res.playlist })
  }
})