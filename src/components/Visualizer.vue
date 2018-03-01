<template>
  <div class="lines">
    <div v-for="(byte, index) in streamData" class="line" :style="{ height: byte + 'px' }" :key="index"></div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['binCount', 'smoothing'],
    data () {
      return {
        playerHasBeenInit: false,
        analyserNode: null,
        frequencyByteData: new Uint8Array(this.binCount),
        streamData: []
      }
    },
    computed: {
      ...mapGetters(['player'])
    },
    watch: {
      player: function (val) {
        this.player.audio.crossOrigin = 'anonymous'
        this.player.on('playing', () => {
          if (!this.playerHasBeenInit) {
            this.initAudioAnalyser()
          }
          this.playerHasBeenInit = true
        }, 0)
      }
    },
    methods: {
      initAudioAnalyser () {
        const context = new (window.AudioContext || window.webkitAudioContext)()
        const source = context.createMediaElementSource(this.player.audio)
        this.analyserNode = context.createAnalyser()
        this.analyserNode.fftSize = this.binCount * 2
        this.analyserNode.smoothingTimeConstant = this.smoothing
        source.connect(this.analyserNode)
        this.analyserNode.connect(context.destination)

        this.initDataStream()
      },
      updateSample () {
        this.analyserNode.getByteFrequencyData(this.frequencyByteData)
        this.streamData = Array.from(this.frequencyByteData)
      },
      initDataStream () {
        this.updateSample()
        window.requestAnimationFrame(this.initDataStream)
      }
    }
  }
</script>
<style lang="scss">
.lines {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  .line {
    flex-shrink: 0;
    width: 6px;
    margin: 0 3px;
    background: rgba(#fff, 0.2);
  }
}
</style>
