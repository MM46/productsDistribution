<template>
  <div class="container">
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Admin Dashboard</div>
          <div class="card-body">
            <div>
                <b-nav tabs fill>
                    <b-nav-item v-bind:class="{ navitem: this.seccion1 }" :active='this.seccion1' @click="setOverlay('section1')">Secciones</b-nav-item>
                    <b-nav-item v-bind:class="{ navitem: this.seccion2 }" :active='this.seccion2' @click="setOverlay('section2')">Productos</b-nav-item>
                    <b-nav-item v-bind:class="{ navitem: this.seccion3 }" :active='this.seccion3' @click="setOverlay('section3')">Carrousel</b-nav-item>
                </b-nav>
                <sections class="overlay" v-if="this.seccion1"></sections>
                <products class="overlay" v-if="this.seccion2"></products>
                <carrousel class="overlay" v-if="this.seccion3"></carrousel>
            </div>
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
import carrousel from './carrousel.vue'
export default {
    data() {
      return {
        name: null,
        seccion1: true,
        seccion2: false,
        seccion3: false,
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
      sections,
      carrousel
  },
 methods: {
    setOverlay(section){
        if(section == "section1"){
          this.seccion1 = true
          this.seccion2 = false
          this.seccion3 = false
        } else if (section == "section2"){
          this.seccion1 = false
          this.seccion2 = true
          this.seccion3 = false
        } else if (section == "section3"){
          this.seccion1 = false
          this.seccion2 = false
          this.seccion3 = true
        }
      }
  }
};
</script>