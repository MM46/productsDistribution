<template>
  <div>
    <navigation-bar/>
    <div>
        <b-container class="bv-example-row bv-example-row-flex-cols">
          <b-row>
            <b-col md="2">
              <b-nav vertical class="verticalnavbar">
                <h2> Secciones </h2>
                <br>
                <b-nav-item v-bind:class="{ navitem: this.seccion1 }" :active='this.seccion1' @click="setOverlay('section1')">Practicocina</b-nav-item>
                <b-nav-item v-bind:class="{ navitem: this.seccion2 }" :active='this.seccion2' @click="setOverlay('section2')">Especialidades</b-nav-item>
                <b-nav-item v-bind:class="{ navitem: this.seccion3 }" :active='this.seccion3' @click="setOverlay('section3')">Cortes Finos</b-nav-item>
                <b-nav-item v-bind:class="{ navitem: this.seccion4 }" :active='this.seccion4' @click="setOverlay('section4')">Línea Magra</b-nav-item>
                <b-nav-item v-bind:class="{ navitem: this.seccion5 }" :active='this.seccion5' @click="setOverlay('section5')">Cortes Frescos</b-nav-item>
              </b-nav>
            </b-col>
            <b-col md="10">
              <div>
                <br><br><br>
                <Practicocina class="overlay" v-if="this.seccion1"></Practicocina>
                <Especialidades class="overlay" v-if="this.seccion2"></Especialidades>
                <CortesFinos class="overlay" v-if="this.seccion3"></CortesFinos>
                <LineaMagra class="overlay" v-if="this.seccion4"></LineaMagra>
                <CortesFrescos class="overlay" v-if="this.seccion5"></CortesFrescos>
                <br><br><br><br><br><br>
              </div>
            </b-col>
          </b-row>
        </b-container>
    </div>
  </div>
</template>

<script>
import Especialidades from './sections/sections/Especialidades.vue'
import CortesFinos from './sections/sections/CortesFinos.vue'
import LineaMagra from './sections/sections/LineaMagra.vue'
import CortesFrescos from './sections/sections/CortesFrescos.vue'
  export default {
    data() {
      return {
          seccion1: true,
          seccion2: false,
          seccion3: false,
          seccion4: false,
          seccion5: false,
      }
    },
    components: {
      Especialidades,
      CortesFinos,
      LineaMagra,
      CortesFrescos,
    },
    methods: {
      setOverlay(section){
        if(section == "section1"){
          this.seccion1 = true
          this.seccion2 = false
          this.seccion3 = false
          this.seccion4 = false
          this.seccion5 = false
        }else if(section == "section2"){
          this.seccion1 = false
          this.seccion2 = true
          this.seccion3 = false
          this.seccion4 = false
          this.seccion5 = false
        }else if(section == "section3"){
          this.seccion1 = false
          this.seccion2 = false
          this.seccion3 = true
          this.seccion4 = false
          this.seccion5 = false
        }else if(section == "section4"){
          this.seccion1 = false
          this.seccion2 = false
          this.seccion3 = false
          this.seccion4 = true
          this.seccion5 = false
        }else if(section == "section5"){
          this.seccion1 = false
          this.seccion2 = false
          this.seccion3 = false
          this.seccion4 = false
          this.seccion5 = true
        }
      },
      getStyle(section){
        if(this.seccion1 && section == "section1"){
          return this.active
        }else if(section == "section2"){
          return "font-weight: bold;"
        }else if(section == "section3"){
          return "font-weight: bold;"
        }else if(section == "section4"){
          return "font-weight: bold;"
        }else if(section == "section5"){
          return "font-weight: bold;"
        }else {
          ""
        }
      }
    }
  }
</script>

<style>
  h2 {
    font-weight: bold !important;
    color: #970000 !important;
    font-family: 'Nunito';
  }
  .verticalnavbar {
    margin-top: 100px;
  }
</style>
