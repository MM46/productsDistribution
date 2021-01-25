<template>
  <div>
    <navBar/>
    <carrousel/>
    <sections/>
    <footer/>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'
import Carrousel from './components/carrousel.vue'
import sections from './sections/Index.vue'

export default {
  components: {
    navBar,
    Carrousel,
    sections
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
}
</style>
