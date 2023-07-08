App({
  globalData: {
    statusBarHeight: 20,
    contentHeight: 500
  },
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBarHeight = res.statusBarHeight
        // this.globalData.screenHeight = res.screenHeight

        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight
      }
    })
  }
})