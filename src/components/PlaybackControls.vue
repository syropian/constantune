<template>
  <div class="playback-controls">
    <div class="playback-control prev fa fa-backward" @click="prevTrack"></div>
    <div class="playback-control playPause fa" :class="{'fa-play': playback.playState == 'PAUSED' || playback.playState == 'IDLE', 'fa-pause': playback.playState == 'PLAYING'}" @click="playTrack"></div>
    <div class="playback-control next fa fa-forward" @click="nextTrack"></div>
    <!-- <div class="playback-control shuffle fa fa-random" :class="{'active': playback.shuffleState == 'ON'}" @click="toggleShuffleState"></div> -->
    <div class="playback-control repeat fa fa-repeat" :class="'repeat-' + playback.repeatState.toLowerCase()" @click="setRepeatState"></div>
    <progress :max="currentTrackDuration" :value="playback.progress" @click="seek" class="track-progress"></progress>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import ShortcutsMixin from './../mixins/ShortcutsMixin'
import PlaybackMixin from './../mixins/PlaybackMixin'
export default {
  mixins: [ShortcutsMixin, PlaybackMixin],
  computed: {
    ...mapState([
      'playback'
    ]),
    ...mapGetters([
      'currentTrack',
      'tracks',
      'player'
    ]),
    currentTrackDuration () {
      return this.currentTrack.duration / 1000
    }
  },
  methods: {
    ...mapActions([
      'setPlayState',
      'setCurrentTrack',
      'setShuffleState',
      'setRepeatState'
    ]),
    playTrack () {
      if (this.playback.playState === 'IDLE') {
        this.playTrackAtIndex(0)
      } else if (this.playback.playState === 'PLAYING') {
        this.pauseTrack()
      } else {
        this.unpauseTrack()
      }
    },
    seek (e) {
      this.player.seek(e)
    },
    toggleShuffleState () {
      if (this.playback.shuffleState === 'ON') {
        this.setShuffleState('OFF')
      } else {
        this.setShuffleState('ON')
      }
    }
  }
}
</script>
<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;

.playback-controls {
  display: flex;
  justify-content: space-between;
  .playback-control {
    color: #666;
    cursor: pointer;
    margin: 0 10px;
    &.prev { margin-left: 0; }
    &.active { color: $pink; }
    &.repeat {
      &.repeat-on { color: $pink; }
      &.repeat-one {
        color: $pink;
        position: relative;
        &:after {
          content: '1';
          font-family: monospace;
          width: 10px; height: 10px;
          background: $pink;
          border-radius: 50%;
          border: 1px solid #fff;
          color: #fff;
          display: flex; justify-content: center; align-items: center;
          font-size: 7px;
          font-weight: bold;
          position: absolute; top: 0; left: -5px;
        }
      }
    }
  }
  .track-progress {
    appearance: none;
    background: rgba(#fff, 0);
    border: 1px solid $pink;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 10px;
    width: 100%; height: 15px;
    overflow: hidden;
    &::-webkit-progress-bar {
      background: rgba(#fff, 0);
    }
    &::-moz-progress-bar {
      background: linear-gradient(to left, $orange , $pink);
    }
    &::-webkit-progress-value {
      background: linear-gradient(to left, $orange , $pink);
    }
  }
}
</style>
