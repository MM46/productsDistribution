<template>
  <mdb-navbar position="top" color="black" dark class="lighten-3 py-4 mb-4">
    <mdb-navbar-brand :to="'/'"><img class="logo" src="../assets/logo.png"></mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav class="ml-auto">
        <mdb-nav-item :to="'/'"> Inicio </mdb-nav-item>
        <mdb-nav-item :to="'productos'"> Productos </mdb-nav-item>
        <mdb-nav-item> Sobre Nosotros </mdb-nav-item>
        <mdb-nav-item> Puntos de Venta </mdb-nav-item>

        <mdb-nav-item :to="'shoppingCart'">
          <mdb-icon icon="shopping-cart"/>
           Tu Carrito
        </mdb-nav-item>
        <template v-if="user.loggedIn">
          <mdb-dropdown start>
            <mdb-dropdown-toggle slot="toggle" color="black">
              <mdb-icon icon="user-circle" />
              {{user.data.displayName}}
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu dropleft style="margin-left: -50px">
              <template v-if="admin">
                <mdb-dropdown-item :to="'dashboard'">
                    <mdb-icon icon="cog" />
                    Panel de Administrador
                </mdb-dropdown-item>
                <div class="dropdown-divider"></div>
                <mdb-dropdown-item @click="signOut">
                  <mdb-icon icon="power-off" />
                  Cerrar Sesión
                </mdb-dropdown-item>
              </template>
              <template v-else>
                <mdb-dropdown-item @click="signOut">
                  <mdb-icon icon="power-off" />
                  Cerrar Sesión
                </mdb-dropdown-item>
              </template>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </template>
        
        <template v-else>
          <router-link to="login">
            <mdb-nav-item> Iniciar sesión </mdb-nav-item>
          </router-link>
          <router-link to="register">
            <mdb-nav-item> Registrarte </mdb-nav-item>
          </router-link>
        </template>
      </mdb-navbar-nav>
      <!-- <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
      </form> -->
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
    data() {
        return {
          admin: false,
        }
    },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  async mounted() {
    await this.isAdmin()
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
    async isAdmin() {
      await firebase.auth().onAuthStateChanged(userAuth => {
        if(userAuth){
          firebase.firestore().collection("users").doc(userAuth.uid)
          .get()
          .then(
          doc => {
            if (doc.exists && doc.data().role == "admin") {
              this.admin = true
            } else {
              this.admin = false
            }
          })
        }
      })
    }
  },
}
</script>



