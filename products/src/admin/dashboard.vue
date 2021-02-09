<template>
  <div class="container">
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Admin Dashboard</div>
          <div class="card-body">
            <div>
                <!-- <hr> -->
                <b-nav tabs fill>
                    <b-nav-item v-bind:class="{ navitem: this.seccion1 }" :active='this.seccion1' @click="setOverlay('section1')">Secciones</b-nav-item>
                    <b-nav-item v-bind:class="{ navitem: this.seccion2 }" :active='this.seccion2' @click="setOverlay('section2')">Productos</b-nav-item>
                </b-nav>
                <sections class="overlay" v-if="this.seccion1"></sections>
                <products class="overlay" v-if="this.seccion2"></products>
            </div>
              <!-- <b-row>
                <b-col md="4">
                  <label for="name">Nombre de la Sección: </label>
                </b-col>
                 <b-col md="8">
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    name="name"
                    style="width: 100%"
                  >
                </b-col>
                <br><br>
                <b-col md="12">
                   <router-link to=agregarProducto>
                       <b-button style="width: 100%"> Ver todas las Secciones </b-button>
                       <br><br>
                    </router-link>
                </b-col>
                <br><br>
                <b-col md="12">
                   <router-link to=agregarSeccion>
                       <b-button style="width: 100%"> Añadir Sección </b-button>
                       <br><br>
                    </router-link>
                </b-col>
                <br><br>
                <b-col md="12">
                   <router-link to=agregarProducto>
                       <b-button style="width: 100%"> Añadir Producto </b-button>
                       <br><br>
                    </router-link>
                </b-col>
              </b-row> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import products from './products.vue'
import sections from './sections.vue'
export default {
    data() {
      return {
        name: null,
        seccion1: true,
        seccion2: false,
      }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
  },
  components: {
      products,
      sections
  },
 methods: {
    setOverlay(section){
        if(section == "section1"){
          this.seccion1 = true
          this.seccion2 = false
        }else if(section == "section2"){
          this.seccion1 = false
          this.seccion2 = true
        }
      },
    getStyle(section){
        if(this.seccion1 && section == "section1"){
          return this.active
        }else if(section == "section2"){
          return "font-weight: bold;"
        }else {
          ""
        }
      }
  }
};
</script>