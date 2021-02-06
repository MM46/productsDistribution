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
          <b-icon-cart style = "margin-right:10px" variant="light"></b-icon-cart>
           Tu Carrito
        </b-button>
        <hr>
          <template v-if="user.loggedIn">
            <b-button class = "navbutton" :to="'shoppingCart'" variant="dark" @click="dropIt">
              <b-icon-person-fill style = "margin-right:10px" variant="light"></b-icon-person-fill >
               <b>{{user.data.displayName}}</b>
            </b-button>
            <transition name="slide">
              <ul class="userInfo" v-if="isDropped">
                <b-button variant="dark" @click.prevent="signOut">
                    Cerrar Sesión 
                  </b-button>
              </ul>
            </transition>
          </template>
          <template v-else>
            <router-link to="login">
              <b-button class = "navbutton" variant="dark" > Iniciar sesión </b-button>
            </router-link>
            <router-link to="register">
              <b-button class = "navbutton" variant="dark" > Registrarte </b-button>
            </router-link>
          </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</header>
</template>

<script>
import { BIconCart, BIconPersonFill} from 'bootstrap-vue'
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
    data() {
        return {
          isDropped: false
        }
    },
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    },
    dropIt() {
      this.isDropped = !this.isDropped
    }
  },
  components: {
    BIconCart,
    BIconPersonFill
  },
}
</script>



