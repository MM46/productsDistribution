<template>
  <div id="app">
    <loading :active.sync="isLoading"/>
    <navigation-bar/>
      <main class="pt-10" style="margin-top: 9rem">
        <router-view></router-view>
      </main>
    <custom-footer/>
  </div>
</template>

<script>
export default {
data () {
    return {
      isLoading: false,
    }
  },
  components: {
  },
  methods: {
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
  font-family: 'Nunito';
}
h4 {
  font-weight: bold !important;
  color: #970000 !important;
  font-family: 'Nunito';
}
.buttonAddCart {
  font-weight: bold;
  color: #292929 !important;
  background-color:transparent
}

.nav-item {
  color: #ffff;
  background:#0000;
}

.logo {
  height: 50px;
  margin-left: 20px;
}
.productImage {
  height: 15rem;
}
header {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 0px solid #0000;
  margin: 1em 0; 
  padding: 0;
}

.footerText {
  margin-top: 15px;
  text-align: center;
  margin-bottom: 15px;
}
.carrousel {
  background-color: #000;
}
h2 {
  font-weight: bold !important;
  color: #970000 !important;
  font-family: 'Nunito';
}
.navitem {
  font-weight: bold;
}
.overlay {
  margin-left: 50px;
  margin-right: 50px;
}
.page {
   background: #F5F5F5 !important;
}
.shoppingCart {
  align-content: start !important;
  background: white !important;
  box-shadow: 5px 5px 5px -2px #e6e6e6;
}
.shoppingCart h3{
   font-weight: medium !important;
}
.jumbotron {
  color: #000;
  font-weight: bold !important;
  background: #EEEEEE !important;
}
.jumbotron h2{
  font-size: 50px;
}
hr {
  color: #fff;
}
.quantity {
  background-color: transparent !important;
  border: none !important;
}
.customButton {
   font-weight: bold !important;
}
.navbutton {
   font-size: 14px !important;
   text-align: center;
   margin-top: 10px;
}

.userInfo{
  position: absolute;
  width: 204px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  transform-origin: top;
  transition: transform .4s ease-in-out;
  overflow: hidden;
}
.slide-enter, .slide-leave-to{
  transform: scaleY(0);
}
.uploading-image{
  display:flex;
}
.modalDetailInfo {
  font-size:12px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.divider {
   background: #d9d9d9; 
   padding: 0.2px; 
   width: 100%; 
   margin-top: 10px;
}
.productsnavbar {
  position: relative;
}
</style>
