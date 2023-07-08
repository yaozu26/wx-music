import { HYEventStore } from 'hy-event-store'
import { getMusicPlaylistDetail } from '../services/music'

const recommendStore = new HYEventStore({
  state: {
    recommendSongs: []
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getMusicPlaylistDetail(3778678).then(res => {
        ctx.recommendSongs = res.playlist.tracks
      })
    }
  }
})

export default recommendStore