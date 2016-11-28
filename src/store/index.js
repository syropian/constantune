import Vue from 'vue'
import Vuex from 'vuex'
import tracks from './modules/tracks'
import playback from './modules/playback'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'constantune',
    paths: [
      'playback.repeatState',
      'tracks.tracks'
    ]
  })],
  modules: {
    tracks,
    playback
  }
})
