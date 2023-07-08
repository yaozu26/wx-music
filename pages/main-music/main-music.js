import { getBannerData, getMusicHotSongsData, getMusicChinaSongData, getMusicPlaylistDetail } from '../../services/music'
import recommendStore from '../../stores/rankingStore'
import playSongListStore from '../../stores/playSongList'
import querySelector from '../../utils/query-selsctor'
import { throttle } from 'underscore'

const querySelectorThrottle = throttle(querySelector, 100)

Page({
  data: {
    searchValue: "",
    bannerData: [],
    bannerHeight: 150,
    recommendSongs: [],
    hotSongListData: [],
    ranklistData: []
  },

  onLoad() {
    this.fetchBannerData()

    // 发起action
    recommendStore.dispatch("fetchRecommendSongsAction")
    recommendStore.onState("recommendSongs", value => {
      this.setData({ recommendSongs: value.slice(0, 6) })
    })

    this.fetchHotSongData()
    this.fetchRanklistData()
  },

  // 界面跳转
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-songs/detail-songs',
    })
  },
  onHotMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-menu/detail-menu',
    })
  },

  // 事件
  onRecommendClick(event) {
    const index = event.currentTarget.dataset.index
    playSongListStore.setState("playlistData", this.data.recommendSongs)
    playSongListStore.setState("playlistIndex", index)
  },

  // 封装函数
  // 请求轮播图数据
  async fetchBannerData() {
    const res = await getBannerData()
    this.setData({ bannerData: res.banners })
  },
  // 请求热门歌单数据
  async fetchHotSongData() {
    const res = await getMusicHotSongsData()
    this.setData({ hotSongListData: res.playlists })
  },
  // 排行榜数据
  async fetchRanklistData() {
    const ranklistIdlist = [3779629, 2884035, 19723756]
    const ranklistData = []
    for( const id of ranklistIdlist ) {
      const res = await getMusicPlaylistDetail(id)
      ranklistData.push(res)
    }
    this.setData({ranklistData })
  },

  // 拿到图片真实高度
  onBannerImageLoad(event) {
    querySelectorThrottle(".image").then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
  }
})