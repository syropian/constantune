import { Promise } from 'es6-promise'
import {
  SET_CURRENT_TRACK,
  SET_TRACKS,
  ADD_TRACK
} from '../mutation-types'
import { shuffle, isArray } from 'lodash'

const state = {
  currentTrack: {},
  tracks: []
}

const getters = {
  currentTrack: state => state.currentTrack,
  tracks: state => state.tracks
}

const actions = {
  addTrack ({ commit }, track) {
    return new Promise((resolve, reject) => {
      commit(ADD_TRACK, track)
      resolve()
    })
  },
  setTracks ({ commit }, tracks) {
    return new Promise((resolve, reject) => {
      commit(SET_TRACKS, tracks)
      resolve()
    })
  },
  setCurrentTrack ({ commit }, track) {
    commit(SET_CURRENT_TRACK, track)
  },
  shuffleTracks ({ commit, state }) {
    commit(SET_TRACKS, shuffle(state.tracks))
  }
}

const mutations = {
  [SET_CURRENT_TRACK] (state, track) {
    state.currentTrack = track
  },
  [SET_TRACKS] (state, tracks) {
    state.tracks = tracks
  },
  [ADD_TRACK] (state, track) {
    if (isArray(track)) {
      state.tracks = state.tracks.concat(track)
    } else {
      state.tracks = state.tracks.concat([track])
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
