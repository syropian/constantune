<template>
  <ul class="playlist">
    <audio-track v-for="track in tracks" :track="track" :playstate="playback.playState" @click.native="playTrack(track)" :key="track.id"></track>
  </ul>
</template>
<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import PlaybackMixin from './../mixins/PlaybackMixin'
  import AudioTrack from './AudioTrack'
  // import sortable from './../directives/sortable'

  export default {
    name: 'Playlist',
    props: ['tracks'],
    mixins: [PlaybackMixin],
    computed: {
      ...mapState([
        'playback'
      ]),
      ...mapGetters([
        'currentTrack',
        'player'
      ])
    },
    methods: {
      ...mapActions([
        'setCurrentTrack',
        'setPlayState',
        'setTrackProgress'
      ])
    },
    components: {
      AudioTrack
    }
  }
</script>
<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;

.playlist-container {
  width: 100%;
  margin-top: 20px;
  .playlist {
    -webkit-overflow-scrolling: touch;
    list-style-type: none;
    margin: 0; padding: 0;
    max-height: 60vh;
    overflow-y: scroll;
    @media screen and (max-width: 414px) {
      max-height: 50vh;
    }
  }
}
</style>
