import playSongListStore from '../../stores/playSongList'

Component({
  properties: {
    songlist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onItemClick(event) {
      const index = event.currentTarget.dataset.index
      // 将数据设置到store中用来共享数据
      playSongListStore.setState("playlistData", this.properties.songlist )
      playSongListStore.setState("playlistIndex", index)
    }
  }
})