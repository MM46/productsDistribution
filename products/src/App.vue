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

.nav-item {
  color: #ffff;
  background:#0000;
}

.logo {
  height: 50px;
  margin-left: 20px;
}
.productImage {
  height: 10rem;
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
#footer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #111111;
  color: #ffffff;
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
.productsnavbar {
  margin-top: 50px;
  margin-left: 0px;
  margin-right: -14px;
  left: 0px;
  right: -14px;
  position: relative;
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
}

</style>
