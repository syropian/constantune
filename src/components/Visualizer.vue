<template>
  <canvas ref="visualizer" class="visualizer" width="1200" height="800"></canvas>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        streamData: null,
        playerHasBeenInit: false,
        volume: 0
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
    mounted () {
      this.initCanvas()
    },
    methods: {
      initAudioAnalyser () {
        this.streamData = new Uint8Array(128)
        const audioCtx = new window.AudioContext()
        const analyser = audioCtx.createAnalyser()
        const source = audioCtx.createMediaElementSource(this.player.audio)
        analyser.fftSize = 256
        source.connect(analyser)
        analyser.connect(audioCtx.destination)
        this.sampleAudioStream(analyser)
        // setInterval(sampleAudioStream, 20)
        setInterval(() => { this.sampleAudioStream(analyser) }, 20)
      },
      sampleAudioStream (analyser) {
        analyser.getByteFrequencyData(this.streamData)
        let total = 0
        for (let i = 0; i < 80; i++) {
          total += this.streamData[i]
        }
        this.volume = total
      },
      initCanvas () {
        const canvas = this.$refs.visualizer
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx = canvas.getContext('2d')
        this.drawCircle(ctx)
      },
      drawCircle (ctx) {
        let angle = this.volume / 8000
        const requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame
        ctx.clearRect(0, 0, this.$refs.visualizer.clientWidth, this.$refs.visualizer.clientHeight)
        ctx.beginPath()
        let radius = 5 / Math.abs(Math.cos(angle))
        ctx.arc(225, 225, Math.min(radius, 100), 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'rgba(255,255,255,0.2)'
        ctx.fill()
        requestAnimationFrame(this.drawCircle.bind(null, ctx))
      }
    }
  }
</script>
<style lang="scss">
.visualizer {
  position: absolute; top: 0; left: 0; z-index: -1;
}
</style>
