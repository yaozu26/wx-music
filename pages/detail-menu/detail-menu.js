import { getMusicMenuHotData, getMusicHotSongsData } from "../../services/music"

Page({
  data: {
    allHotSongData : []
  },

  onLoad() {
    this.fetchAllHotSongData()
  },


  // 请求数据
  async fetchAllHotSongData() {
    const tagRes = await getMusicMenuHotData()
    const tags = tagRes.tags

    const allPromises = []
    for(const tag of tags) { 
      const promise = getMusicHotSongsData(tag.name)
      allPromises.push(promise)
    }

    Promise.all(allPromises).then(res => {
      this.setData({ allHotSongData: res })
    })
  }
})