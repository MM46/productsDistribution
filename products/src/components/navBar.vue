<template>
<header>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="'/'"><img src="../assets/logo.png"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="'/'">Inicio</b-nav-item>
        <b-nav-item href="#">Sobre Nosotros</b-nav-item>
        <b-nav-item href="#">Puntos de Venta</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button :to="'shoppingCart'" class="rounded-circle" variant="light" >
          <b-icon-cart variant="dark"></b-icon-cart>
        </b-button>
          <b-button variant="light" >
          Iniciar sesión o Registrarte
          </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</header>
</template>

<script>
import { BIconCart} from 'bootstrap-vue'
export default {
    data() {
        return {
            meal: "mymeal"
        }
    },
  methods: {
    getMeal() {
      console.log(this.meal)
    }
  },
  components: {
    BIconCart
  },
}
</script>

<style>
.nav-item {
  color: #ffff;
  background:#0000;
}
.navbar {
  height: 130px
}
img {
  height: 50px;
  margin-left: 20px;
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
</style>



