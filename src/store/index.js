import Vue from 'vue'
import Vuex from 'vuex'
import tracks from './modules/tracks'
import playback from './modules/playback'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tracks,
    playback
  }
})
