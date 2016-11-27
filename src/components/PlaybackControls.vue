<template>
  <div class="playback-controls">
    <div class="playback-control prev fa fa-backward" @click="prevTrack"></div>
    <div class="playback-control playPause fa" :class="{'fa-play': playback.playState == 'PAUSED' || playback.playState == 'IDLE', 'fa-pause': playback.playState == 'PLAYING'}" @click="doPlayTrack"></div>
    <div class="playback-control next fa fa-forward" @click="nextTrack"></div>
    <!-- <div class="playback-control shuffle fa fa-random" :class="{'active': playback.shuffleState == 'ON'}" @click="toggleShuffleState"></div> -->
    <div class="playback-control repeat fa fa-refresh" :class="'repeat-' + playback.repeatState.toLowerCase()" @click="setRepeatState"></div>
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
      'setRepeatState',
      'setTrackProgress',
      'shuffleTracks'
    ]),
    doPlayTrack () {
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
          position: absolute; top: 0; right: -5px;
          text-indent: 0.5px;
        }
      }
    }
  }
  .track-progress {
    appearance: none;
    background: rgba(#fff, 0);
    background: linear-gradient(to right, $pink , $orange);
    border-radius: 9999px;
    cursor: pointer;
    margin-left: 10px;
    width: 100%; height: 15px;
    overflow: hidden;
    position: relative;
    &:after {
      border-radius: 9999px;
      content: "";
      height: 13px;
      background: #fff;
      z-index: 1;
      position: absolute; top: 1px; left: 1px; right: 1px;
    }
    &::-webkit-progress-bar {
      border-radius: 9999px;
      background: rgba(#fff, 0);
      position: relative;
      z-index: 2;
    }
    &::-moz-progress-bar {
      background: linear-gradient(to right, $pink , $orange);
    }
    &::-webkit-progress-value {
      background: linear-gradient(to right, $pink , $orange);
    }
  }
}
</style>
