<template>
  <ul class="playlist" ref="playlist" @keydown.prevent>
    <audio-track v-for="(track, index) in tracks" :track="track" :playstate="playback.playState" @click.native="playTrack(track)" :key="track.id" :index="index"></audio-track>
  </ul>
</template>
<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import PlaybackMixin from './../mixins/PlaybackMixin'
  import AudioTrack from './AudioTrack'
  import Sortable from 'sortablejs'

  export default {
    name: 'Playlist',
    props: ['tracks'],
    mixins: [PlaybackMixin],
    mounted () {
      Sortable.create(this.$refs.playlist, {
        animation: 150,
        delay: 150,
        onUpdate: ({oldIndex, newIndex}) => {
          const from = oldIndex
          const to = newIndex
          this.tracks.splice(to, 0, this.tracks.splice(from, 1)[0])
          setTimeout(() => {
            this.setTracks(this.tracks)
          }, 0)
        }
      })
    },
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
        'setTracks',
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
