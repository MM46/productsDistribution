<template>
  <div id="app">
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/footer.vue'
export default {
data () {
    return {

    }
  },
  components: {
    Footer
  }
}
</script>

<style>
</style>
