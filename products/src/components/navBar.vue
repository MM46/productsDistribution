<template>
<header class= "navbar">
  <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="'/'"><img src="../assets/logo.png"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
          <b-button :to="'/'" variant="dark"> Inicio </b-button>
          <hr>
          <b-button :to="'productos'" variant="dark"> Productos </b-button>
          <hr>
          <b-button variant="dark"> Sobre Nosotros </b-button>
          <hr>
          <b-button variant="dark"> Puntos de Venta </b-button>
          <hr>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button :to="'shoppingCart'" variant="dark" >
          <b-icon-cart variant="light"></b-icon-cart> Tu Carrito
        </b-button>
        <hr>
        <b-button variant="dark" > Iniciar sesión o Registrarte </b-button>
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
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 0px solid #0000;
  margin: 1em 0; 
  padding: 0;
}
</style>



