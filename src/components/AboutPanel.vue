<template>
  <div class="about-wrapper" :class="{'active': visible}" @click.self="hide">
    <div class="about-container">
      <h3>What is Constantune?</h3>
      <p>Constantune is a simple, loopable playlist builder for SoundCloud tracks. Simply paste a SoundCloud track or playlist URL, build your playlist, and let it loop.</p>
      <h3>Why?</h3>
      <p>Constantune is a side project built out of frustration that I couldn't simply loop a track, or series of tracks on SoundCloud. Hopefully you find it useful as well.</p>
      <h3>Who Built It?</h3>
      <p>Hi! I'm Collin Henderson, front-end developer at <a href="http://format.com" target="_blank" rel="noopener">Format</a>, and creator of <a href="https://astralapp.com" target="_blank" rel="noopener">Astral</a>. I'm <a href="http://twitter.com/syropian" target="_blank" rel="noopener">@syropian</a> on Twitter.</p>
      <h3>Nerdy Stuff</h3>
      <p>Constantune is built with <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a>. It uses the SoundCloud API for track information &amp; streaming, HTML5 Audio API for visualizations, and HTML5 LocalStorage to persist your playlists.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPanel',
  props: ['visible'],
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
$orange: #FF512F;
$pink: #DD2476;

.about-wrapper {
  transition: all 500ms ease 500ms;
  background: linear-gradient(to left, rgba($orange, 0.8) , rgba($pink, 0.8));
  display: flex; justify-content: center; align-items: flex-end;
  opacity: 0;
  padding: 0 20px;
  pointer-events: none;
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999;
  .about-container {
    transition: all 500ms ease;
    transform: translate3d(0, 75%, 0);
    background: #fff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    color: #666;
    font-size: 0.9rem;
    max-width: 800px;
    opacity: 0;
    padding: 20px;
    p { margin-bottom: 25px; }
    a {
      transition: color 250ms linear;
      color: $pink;
      &:hover { color: $orange; }
    }
  }
  &.active {
    transition: all 500ms ease;
    pointer-events: auto;
    opacity: 1;
    .about-container {
      transition: all 500ms ease 500ms;
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
}
</style>
