<template>
<header class= "navbar">
  <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="'/'"><img class="logo" src="../assets/logo.png"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
          <b-button class = "navbutton" :to="'/'" variant="dark"> Inicio </b-button>
          <hr>
          <b-button class = "navbutton" :to="'productos'" variant="dark"> Productos </b-button>
          <hr>
          <b-button class = "navbutton" variant="dark"> Sobre Nosotros </b-button>
          <hr>
          <b-button class = "navbutton" variant="dark"> Puntos de Venta </b-button>
          <hr>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button class = "navbutton" :to="'shoppingCart'" variant="dark" >
          <b-icon-cart variant="light"></b-icon-cart> Tu Carrito
        </b-button>
        <hr>
        <b-button class = "navbutton" variant="dark" > Iniciar sesión o Registrarte </b-button>
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



