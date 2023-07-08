import { getTopMvs } from '../../services/vedio'

Page({
  data: {
    vedioList :[],
    offset: 0,
    hasMore: true
  },

  onLoad() {
    this.fetchTopMvs()
  },

  // 触底事件
  onReachBottom() {
    if(!this.data.hasMore) {
      return
    }
    this.fetchTopMvs()
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({vedioList: []})
    this.data.offset = 0
    this.data.hasMore = true

    await this.fetchTopMvs()
    wx.stopPullDownRefresh()
  },

  // 封装函数: 请求数据
  async fetchTopMvs() {
    const res = await getTopMvs(this.data.offset)
    const newVedioList = [...this.data.vedioList, ...res.data]

    this.setData({vedioList: newVedioList})
    this.data.offset = this.data.vedioList.length
    this.data.hasMore = res.hasMore
  }
})