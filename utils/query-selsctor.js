export default function querySelector(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(res => {
      resolve(res)
    })
  })
}