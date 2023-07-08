import { baseURL } from './config'

class YZRequest {
  constructor(BaseURL) {
    this.BaseURL = BaseURL
  }

  // 发送请求
  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.BaseURL+url,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  // 请求方式
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export const yzReqInstance = new YZRequest(baseURL)