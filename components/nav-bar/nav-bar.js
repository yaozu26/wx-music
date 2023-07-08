const app = getApp()

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      default: () => "标题"
    }
  },
  data: {
    statusBarHeight: 20
  },
  attached() {
    this.setData({ statusBarHeight: app.globalData.statusBarHeight })
  },
  methods: {
    // 事件
    backPageClick() {
      wx.navigateBack()
    }
  }
})