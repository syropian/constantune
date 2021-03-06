export default {
  mounted () {
    document.addEventListener('keyup', (e) => {
      if (this.tracks.length) {
        switch (e.keyCode) {
          case 40:
            this.nextTrack()
            break
          case 38:
            this.prevTrack()
            break
          case 32:
            if (this.playback.playState === 'IDLE') {
              this.playTrackAtIndex(0)
            } else if (this.playback.playState === 'PLAYING') {
              this.pauseTrack()
            } else {
              this.unpauseTrack()
            }
            break
          case 82:
            this.setRepeatState()
            break
          case 83:
            this.shuffleTracks()
            break
        }
      }
    }, false)
  }
}
