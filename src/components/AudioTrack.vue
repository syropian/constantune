<template>
  <li class="track" :class="{'active': isCurrentTrack}">
    <div class="track-state" v-if="isCurrentTrack">
      <i class="fa" :class="{'fa-play': playstate == 'PAUSED', 'fa-pause': playstate == 'PLAYING'}"></i>
    </div>
    <div class="track-name">{{ track.title }}</div>
    <!-- <div class="remove-track">&times;</div> -->
  </li>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'audio-track',
    props: ['track', 'playstate'],
    computed: {
      ...mapGetters([
        'currentTrack'
      ]),
      isCurrentTrack () {
        return this.track.id === this.currentTrack.id
      }
    }
  }
</script>
<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;

.track {
  transition: all 250ms ease;
  border-bottom: 1px solid #eee;
  color: #999;
  cursor: pointer;
  display: flex;
  padding: 10px 10px 10px 0;
  &:last-child { border-bottom: none; }
  &:hover {
    color: $pink;
  }
  &.active {
    color: $orange;
  }
  .track-state {
    margin-right: 10px;
  }
  .track-name { pointer-events: none;}
  .remove-track {
    width: 20px; height: 20px;
    color: #999;
    cursor: pointer;
    margin-left: auto;
    position: relative; left: 4px;
    &:hover {
      color: #ec213a;
    }
  }
}
</style>
