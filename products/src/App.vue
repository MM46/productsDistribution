<template>
  <div id="app">
    <router-view></router-view>
    <custom-footer/>
  </div>
</template>

<script>
export default {
data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Nunito');
#app {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  font-weight: 900 !important;
  color: #970000 !important;
  font-family: 'Nunito';
  font-size: 200% !important;
}
h4 {
  font-weight: bold !important;
  color: #970000 !important;
  font-family: 'Nunito';
}
h5 {
  font-weight: bold !important;
  color: #000 !important;
}
.buttonAddCart {
  font-weight: bold;
  color: #292929 !important;
  background-color:transparent
}
</style>
