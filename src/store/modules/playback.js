import {
  SET_PLAYER,
  SET_PROGRESS,
  SET_PLAY_STATE,
  SET_REPEAT_STATE,
  SET_SHUFFLE_STATE,
  SET_VOLUME
} from '../mutation-types'

const state = {
  player: null,
  progress: 0,
  playState: 'IDLE',
  repeatState: 'OFF',
  shuffleState: 'OFF',
  volume: 50
}

const getters = {
  player: state => state.player
}

const actions = {
  setPlayer ({ commit }, player) {
    commit(SET_PLAYER, player)
  },
  setPlayState ({ commit }, playState) {
    commit(SET_PLAY_STATE, playState)
  },
  setTrackProgress ({ commit }, progress) {
    commit(SET_PROGRESS, progress)
  },
  setShuffleState ({ commit }, shuffleState) {
    commit(SET_SHUFFLE_STATE, shuffleState)
  },
  setRepeatState ({ commit, state }) {
    let repeatState
    switch (state.repeatState) {
      case 'OFF':
        repeatState = 'ON'
        break
      case 'ON':
        repeatState = 'ONE'
        break
      case 'ONE':
        repeatState = 'OFF'
        break
    }
    commit(SET_REPEAT_STATE, repeatState)
  }
}

const mutations = {
  [SET_PLAYER] (state, player) {
    state.player = player
  },
  [SET_PROGRESS] (state, progress) {
    state.progress = progress
  },
  [SET_PLAY_STATE] (state, playState) {
    state.playState = playState
  },
  [SET_REPEAT_STATE] (state, repeatState) {
    state.repeatState = repeatState
  },
  [SET_SHUFFLE_STATE] (state, shuffleState) {
    state.shuffleState = shuffleState
  },
  [SET_VOLUME] (state, volume) {
    state.volume = volume
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
