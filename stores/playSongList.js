import { HYEventStore } from 'hy-event-store'

const playSongListStore = new HYEventStore({
  state: {
    playlistData: [],
    playlistIndex : 0
  }
})

export default playSongListStore