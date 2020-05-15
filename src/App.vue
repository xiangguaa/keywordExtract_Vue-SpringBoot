<template>
  <div id="app">
    <!-- <router-link to="/">home</router-link>  |
    <router-link to="/login">login</router-link>  |
    <router-link to="/extract">extract</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  /* background-color: #fc5563; */
  /* margin-top: 60px; */
}
</style>
