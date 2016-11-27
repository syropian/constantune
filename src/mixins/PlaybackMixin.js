import { findIndex } from 'lodash'

export default {
  computed: {
    currentTrackIndex () {
      return findIndex(this.tracks, track => track.id === this.currentTrack.id)
    }
  },
  methods: {
    playingAndCurrentTrack (track) {
      return this.playback.playState === 'PLAYING' && track.id === this.currentTrack.id
    },
    playingOrPausedAndNotCurrentTrack (track) {
      return this.playback.playState !== 'IDLE' && track.id !== this.currentTrack.id
    },
    playTrack (track) {
      if (!track.streamable) {
        this.player.stop()
        this.setPlayState('IDLE')
        this.setCurrentTrack({})
        window.alert('Sorry, this track is not streamable.')
        return false
      }
      if (this.playback.playState === 'IDLE') {
        this.setPlayState('PLAYING')
        this.player.play({streamUrl: track.stream_url})
      } else if (this.playingAndCurrentTrack(track)) {
        this.setPlayState('PAUSED')
        this.player.pause()
      } else if (this.playingOrPausedAndNotCurrentTrack(track)) {
        this.setPlayState('PLAYING')
        this.player.play({streamUrl: track.stream_url})
      } else {
        this.setPlayState('PLAYING')
        this.player.play({streamUrl: track.stream_url})
      }
      setTimeout(() => {
        this.setCurrentTrack(track)
      }, 0)
      this.player.on('ended', () => {
        this.nextTrack()
      })
      this.player.on('timeupdate', () => {
        this.setTrackProgress(this.player.audio.currentTime)
      })
    },
    playTrackAtIndex (index) {
      if (index === -1) {
        this.setPlayState('IDLE')
        return false
      }
      this.playTrack(this.tracks[index])
    },
    nextTrack () {
      let nextIndex
      switch (this.playback.repeatState) {
        case 'OFF':
          if (this.currentTrackIndex === this.tracks.length - 1) {
            nextIndex = -1
          } else {
            nextIndex = this.currentTrackIndex + 1
          }
          break
        case 'ON':
          if (this.currentTrackIndex === this.tracks.length - 1) {
            nextIndex = 0
          } else {
            nextIndex = this.currentTrackIndex + 1
          }
          break
        case 'ONE':
          nextIndex = this.currentTrackIndex
          break
      }
      const nextTrack = this.tracks[nextIndex]
      if (!nextTrack.streamable) {
        this.player.stop()
        this.setPlayState('IDLE')
        this.setCurrentTrack({})
        window.alert('Sorry, this track is not streamable.')
        return false
      }
      this.player.stop()
      this.setPlayState('PLAYING')
      this.player.play({streamUrl: nextTrack.stream_url})
      setTimeout(() => {
        this.setCurrentTrack(nextTrack)
      }, 0)
    },
    prevTrack () {
      let prevIndex
      switch (this.playback.repeatState) {
        case 'OFF':
          if (this.currentTrackIndex === 0) {
            prevIndex = 0
          } else {
            prevIndex = this.currentTrackIndex - 1
          }
          break
        case 'ON':
          if (this.currentTrackIndex === 0) {
            prevIndex = 0
          } else {
            prevIndex = this.currentTrackIndex - 1
          }
          break
        case 'ONE':
          prevIndex = this.currentTrackIndex
          break
      }
      const prevTrack = this.tracks[prevIndex]
      if (!prevTrack.streamable) {
        this.player.stop()
        this.setPlayState('IDLE')
        this.setCurrentTrack({})
        window.alert('Sorry, this track is not streamable.')
        return false
      }
      this.player.stop()
      this.setPlayState('PLAYING')
      this.player.play({streamUrl: prevTrack.stream_url})
      setTimeout(() => {
        this.setCurrentTrack(prevTrack)
      }, 0)
    },
    pauseTrack () {
      this.setPlayState('PAUSED')
      this.player.pause()
    },
    unpauseTrack () {
      this.setPlayState('PLAYING')
      this.player.play({streamUrl: this.currentTrack.stream_url})
    }

  }
}
