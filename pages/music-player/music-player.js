import { throttle } from 'underscore'
import { getSongDetail, getSongLyric } from '../../services/music'
import { parseLyric } from '../../utils/formatLyric'
import playSongListStore from '../../stores/playSongList'

const app = getApp()
const audioContext = wx.createInnerAudioContext()
const modeNames = ["order", "repeat", "random"]

Page({
  data: {
    id: "",
    currentSong: {},
    currentIndex: 0,
    pagelist: ["歌曲", "歌词"],
    contentHeight: 500,
    statusBarHeight: 20,
    ar: "",

    // 播放器数据
    currentTime: 0,
    duration: 0,
    sliderValue: 0,
    isSliderChanging: false,
    isPlaying: true,
    isWaitting: false,

    // 歌词
    lyricInfo: [],
    currentLyric: "",
    currentLyricIndex: -1,
    lyricScrollTop: 0,

    // 共享数据
    playlistData: [],
    playlistIndex: 0,

    playModeName: "order",
    playModeIndex: 0
  },

  onLoad(options) {
    this.setData({
      contentHeight: app.globalData.contentHeight,
      statusBarHeight: app.globalData.statusBarHeight,
    })

    const id = options.id
    this.setupPlaySong(id)

    // 监听歌曲进度的变化
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging && !this.data.isWaitting) {
        this.setData({ currentTime: audioContext.currentTime * 1000 })
        const sliderValue = this.data.currentTime / this.data.duration * 100
        this.setData({ sliderValue })
      }

      // 匹配歌词
      let index = this.data.lyricInfo.length - 1
      for (let i = 0; i < this.data.lyricInfo.length; i++) {
        const info = this.data.lyricInfo[i]
        if (info.time > audioContext.currentTime * 1000) {
          index = i - 1
          break
        }
      }
      const currentLyric = this.data.lyricInfo[index].text
      this.setData({ currentLyric, currentLyricIndex: index, lyricScrollTop: index * 35 })
    })

    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    audioContext.onEnded(() => {
      if(audioContext.loop) return
      this.nextClick()
    })

    // 获取共享数据
    playSongListStore.onStates(["playlistData", "playlistIndex"], this.getPlaySongListHangler)
  },

  // 事件
  onSwiperChange(event) {
    this.setData({ currentIndex: event.detail.current })
  },
  changeClick(event) {
    const currentIndex = event.currentTarget.dataset.index
    this.setData({ currentIndex })
  },
  sliderClick(event) {
    this.data.isWaitting = true

    setTimeout(() => {
      this.data.isWaitting = false
    }, 1500)
    const value = event.detail.value

    const currentTime = value / 100 * this.data.duration
    audioContext.seek(currentTime / 1000)
    this.setData({ currentTime, isSliderChanging: false, sliderValue: value })
  },
  sliderChanging: throttle(function (event) {
    const value = event.detail.value

    const currentTime = value / 100 * this.data.duration
    this.setData({ currentTime })
    this.isSliderChanging = true
  }, 100),
  onPlayOrPause() {
    const isPlaying = !this.data.isPlaying
    if (isPlaying) {
      audioContext.play()
    } else {
      audioContext.pause()
    }
    this.setData({ isPlaying })
  },

  // 播放器事件
  nextClick() {
    this.changeSong()
  },
  prevClick() {
    this.changeSong(false)
  },

  modeClick() {
    this.data.playModeIndex = this.data.playModeIndex + 1
    if (this.data.playModeIndex === modeNames.length) {
      this.data.playModeIndex = 0
    }

    if(this.data.playModeIndex === 1) {
      audioContext.loop = true
    }

    this.setData({ playModeName: modeNames[this.data.playModeIndex] })
  },

  // 事件封装
  changeSong(isNext = true) {
    const playlistData = this.data.playlistData
    let playlistIndex = this.data.playlistIndex

    // 切换模式
    switch (this.data.playModeIndex) {
      case 0:
      case 1:
        if (isNext) {
          playlistIndex = playlistIndex + 1
          if (playlistIndex === playlistData.length) playlistIndex = 0
        } else {
          playlistIndex = playlistIndex - 1
          if (playlistIndex === -1) playlistIndex = playlistData.length - 1
        }
        break
      case 2: {
        playlistIndex = Math.floor(Math.random() * playlistData.length)
        break
      }
    }


    const id = playlistData[playlistIndex].id

    // 请求下一首歌时先初始化掉上一首的数据
    this.setData({
      currentSong: {},
      sliderValue: 0,
      currentTime: 0,
      duration: 0
    })
    this.setupPlaySong(id)

    playSongListStore.setState("playlistIndex", playlistIndex)
  },

  // 播放歌曲
  setupPlaySong(id) {
    this.setData({ id })
    // 1.获取歌曲详情
    getSongDetail(id).then(res => {
      const data = res.songs[0]
      const ars = data.ar.map(item => item.name)
      const ar = ars.join("/")
      this.setData({
        currentSong: data,
        ar,
        duration: data.dt
      })
    })

    // 2.获取歌词信息
    getSongLyric(id).then(res => {
      const lrcString = res.lrc.lyric
      this.setData({ lyricInfo: parseLyric(lrcString) })
    })

    // 3.播放当前歌曲
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
  },

  // store
  getPlaySongListHangler({ playlistData, playlistIndex }) {
    if (playlistData) {
      this.setData({ playlistData })
    }
    if (playlistIndex !== undefined) {
      this.setData({ playlistIndex })
    }
  },

  // 页面卸载
  onUnload() {
    playSongListStore.offStates(["playlistData", "playlistIndex"], this.getPlaySongListHangler)
  }
})