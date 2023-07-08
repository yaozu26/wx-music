import { yzReqInstance } from './index'

// 轮播图
export function getBannerData() {
  return yzReqInstance.get({ url: "/banner", data: { type: 2 } })
}

// 歌曲
export function getMusicPlaylistDetail(id) {
  return yzReqInstance.get({ url: "/playlist/detail", data: { id } })
}

export function getMusicHotSongsData(cat = "全部", limit = 6, offset = 0) {
  return yzReqInstance.get({ url: "/top/playlist", data: { cat, limit, offset } })
}

export function getMusicMenuHotData() {
  return yzReqInstance.get({ url: "/playlist/hot" })
}

// 歌曲详情
export function getSongDetail(ids) {
  return yzReqInstance.get({ url: "/song/detail", data: { ids } })
}

// 歌词信息
export function getSongLyric(id) {
  return yzReqInstance.get({ url: "/lyric", data: { id } })
}