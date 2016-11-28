<template>
  <div id="app">
    <about-panel :visible="aboutShowing" @hide="aboutShowing = false"></about-panel>
    <visualizer :bin-count="128" :smoothing="0.80"></visualizer>
    <div class="logo"><img src="static/images/logo.svg" alt="Constatune"></div>
    <div class="main">
      <div class="header-bar">
        <form @submit.prevent="addNewTrackFromUrl" class="addTrackForm">
          <input type="text" v-model="url" @keyup.stop placeholder="Enter a SoundCloud Track or Playlist URL" />
        </form>
        <!-- <button class="settings-button"><i class="fa fa-cog"></i></button> -->
      </div>
      <div class="playback-controls-container" v-if="tracks.length">
        <playback-controls></playback-controls>
      </div>
      <div class="playlist-container">
        <div class="track-errors" v-if="badTracks.length">
          <div class="track-errors-hide" @click="badTracks = []">&times;</div>
          <div class="track-errors-message">
            <p>The following tracks were unable to be added because they are not streamable:</p>
            <ul>
              <li v-for="track in badTracks">{{ track }}</li>
            </ul>
          </div>
        </div>
        <playlist :tracks="tracks"></playlist>
      </div>
    </div>
    <div class="footer">
      <a href="https://soundcloud.com" target="_blank" rel="noopener"><img src="static/images/sc.png" alt="Powered by SoundCloud" width="52" height="16" /></a>
      <div class="footer-links">
        <div class="footer-author">A project by <a href="http://syropia.net" target="_blank" rel="noopener">Syropia</a>.</div>
        <a href="#" @click.prevent="aboutShowing = true">About</a>
        <a href="https://github.com/syropian/constantune" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import SoundCloudAudio from 'soundcloud-audio'
import ls from 'local-storage'
import { mapState, mapActions, mapGetters } from 'vuex'
import AboutPanel from './components/AboutPanel'
import PlaybackControls from './components/PlaybackControls'
import Playlist from './components/Playlist'
import Visualizer from './components/Visualizer'

export default {
  name: 'App',
  data () {
    return {
      url: '',
      badTracks: [],
      aboutShowing: false
    }
  },
  computed: {
    ...mapState([
      'playback'
    ]),
    ...mapGetters([
      'tracks',
      'player'
    ])
  },
  methods: {
    ...mapActions([
      'addTrack',
      'setPlayer'
    ]),
    addNewTrackFromUrl () {
      this.badTracks = []
      this.player.resolve(this.url, (res) => {
        if (res.hasOwnProperty('tracks')) {
          const goodTracks = res.tracks.filter(track => track.streamable)
          this.badTracks = res.tracks.filter(track => !track.streamable).map(track => track.title)
          this.addTrack(goodTracks).then(() => {
            ls('tracks', this.tracks)
          })
        } else {
          if (res.streamable) {
            this.addTrack(res).then(() => {
              ls('tracks', this.tracks)
            })
          } else {
            this.badTracks.push(res.title)
          }
        }
        this.url = ''
      })
    }
  },
  mounted () {
    this.setPlayer(new SoundCloudAudio(window.SOUNDCLOUD_API_KEY))
    if (ls('tracks')) {
      this.addTrack(ls('tracks'))
    }
  },
  components: {
    AboutPanel,
    PlaybackControls,
    Playlist,
    Visualizer
  }
}
</script>

<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;
$red: #ec213a;

*, *::before, *::after {
  box-sizing: border-box;
}
body {
  background: linear-gradient(to left, $orange , $pink);
  font-family: "Open Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  padding: 20px;
}
.logo {
  max-width: 800px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  img {
    max-width: 40%;
  }
}
.main {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(#000, 0.08);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto 0 auto;
}
.header-bar {
  display: flex;
  margin-bottom: 20px;
  .addTrackForm {
    width: 100%;
    input[type=text]{
      appearance: none;
      border-radius: 0;
      transition: border 250ms ease;
      color: #666;
      width: 100%; height: 40px;
      border: none;
      border-bottom: 2px solid #eee;
      outline: none;
      padding: 5px 10px 5px 0;
      &:focus {
        border-bottom: 2px solid $pink;
      }
    }
  }
  .settings-button {
    transition: color 250ms ease;
    appearance: none;
    background: transparent;
    border: none;
    color: #666;
    margin-left: 20px;
    outline: none;
    padding-right: 0;
    &:hover { color: $orange; }
  }
}
.track-errors {
  background: $red;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 3px;
  padding: 15px;
  position: relative;
  p {
    margin-top: 0;
  }
  .track-errors-hide {
    cursor: pointer;
    position: absolute; top: 5px; right: 10px;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1;
  }
}
.footer {
  display: flex;
  margin: 20px auto;
  max-width: 800px;
  .footer-links {
    display: flex; align-items: flex-start;
    color: #fff;
    margin-left: auto;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.7rem;
    a {
      transition: border 250ms linear;
      border-bottom: 2px solid rgba(#fff, 1);
      color: #fff;
      margin-left: 10px;
      text-decoration: none;
      &:hover {
        border-bottom: 2px solid rgba(#fff, 0.5);
      }
    }
    .footer-author {
      margin-right: 10px;
      a { margin-left: 0; }
    }
    @media screen and (max-width: 414px) {
      display: none;
    }
  }
  @media screen and (max-width: 414px) {
    justify-content: center;
    margin: 10px auto;
  }
}
.sortable-ghost {
  // opacity: 0.2;
}
.sortable-chosen {
  background: #fff;
  border: 1px solid #eee!important;
  border-radius: 3px;
  color: #999;
  padding: 10px!important;
}

@media screen and (max-width: 414px) {
  html, body {
    overflow: hidden;
  }
}

</style>
