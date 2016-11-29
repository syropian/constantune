<template>
  <li class="track" :class="{'active': isCurrentTrack, 'not-streamable': !track.streamable}">
    <div class="track-state" v-if="!track.streamable" title="This track is not streamable">
      <i class="fa fa-warning"></i>
    </div>
    <div class="track-state" v-if="isCurrentTrack">
      <i class="fa" :class="{'fa-play': playstate == 'PAUSED', 'fa-pause': playstate == 'PLAYING'}"></i>
    </div>
    <div class="track-name">{{ track.title }}</div>
    <div class="remove-track" @click.stop="doRemoveTrack(index)">&times;</div>
  </li>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'audio-track',
    props: ['track', 'playstate', 'index'],
    computed: {
      ...mapGetters([
        'currentTrack',
        'tracks',
        'player'
      ]),
      isCurrentTrack () {
        return this.track.id === this.currentTrack.id
      }
    },
    methods: {
      ...mapActions([
        'setCurrentTrack',
        'removeTrack',
        'setPlayState'
      ]),
      doRemoveTrack (index) {
        if (this.tracks[index].id === this.currentTrack.id) {
          this.player.stop()
          this.setPlayState('IDLE')
          this.setCurrentTrack({})
        }
        this.removeTrack(index)
      }
    }
  }
</script>
<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;
$red: #ec213a;

.track {
  border-bottom: 1px solid #eee;
  color: #999;
  cursor: pointer;
  display: flex;
  padding: 10px 10px 10px 0;
  &:last-child { border-bottom: none; }
  &:hover {
    color: $pink;
    .remove-track { opacity: 1; }
  }
  &.active {
    color: $orange;
  }
  .track-state {
    margin-right: 10px;
    position: relative;
  }
  .track-name { pointer-events: none;}
  .remove-track {
    transition: opacity 250ms ease;
    width: 20px; height: 20px;
    color: #999;
    cursor: pointer;
    margin-left: auto;
    opacity: 0;
    position: relative; left: 4px;
    &:hover {
      color: $red;
    }
  }
  &.not-streamable {
    .track-name {
      color: $red;
      text-decoration: line-through;
    }
    .track-state {
      color: $red;
    }
  }
}
</style>
