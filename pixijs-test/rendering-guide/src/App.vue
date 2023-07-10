<template>
  <div id="app">
   <button @click="onClickBtn()">Click To Switch Mode</button>
   <div>{{ mode }}</div>
   <JsExample v-if="mode === 'js'" />
   <WebGlExample v-else />
  </div>
</template>

<script>
import JsExample from '@/components/edge-detection-js.vue';
import WebGlExample from '@/components/edge-detection-webgl.vue';

export default {
  name: 'App',
  components: {
    JsExample,
    WebGlExample,
  },
  data() {
    return {
      mode: 'js',
    }
  },
  methods: {
    onClickBtn() {
      this.mode = this.mode === 'js' ? 'webgl' : 'js'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
