import { getMvURL, getMvInfo, getRelated } from '../../services/vedio'

Page({
  data: {
    id: 0,
    mvURL : "",
    mvInfo: {},
    relatedList: [],
    danmuList: [
      { text: "哈哈哈, 真好听", color: "#ff0000", time: 3 },
      { text: "呵呵呵, 不错哦", color: "#ffff00", time: 10 },
      { text: "嘿嘿嘿, 好喜欢", color: "#0000ff", time: 15 },
    ]
  },

  onLoad(options) {
    this.setData({id: options.id})
    this.fetchMvURL()
    this.fetchMvInfo()
    this.fetchMvRealted()
  },

  // 封装函数
  async fetchMvURL() {
    const res = await getMvURL(this.data.id)
    this.setData({ mvURL: res.data.url })
  },

  async fetchMvInfo() {
    const res = await getMvInfo(this.data.id)
    this.setData({ mvInfo: res.data })
  },

  async fetchMvRealted() {
    const res = await getRelated(this.data.id)
    this.setData({ relatedList: res.data })
  }
})