<template>
  <div>
    <hr>
  <b-nav tabs fill>
    <b-nav-item v-if="seccion1" style ="font-weight: bold;" @click="setOverlay('section1')">Practicocina</b-nav-item>
    <b-nav-item v-else @click="setOverlay('section1')"> Practicocina </b-nav-item>
    <b-nav-item v-if="seccion2" style ="font-weight: bold;" @click="setOverlay('section2')">Especialidades</b-nav-item>
    <b-nav-item v-else @click="setOverlay('section2')">Especialidades</b-nav-item>
    <b-nav-item v-if="seccion3" style ="font-weight: bold;" @click="setOverlay('section3')">Cortes Finos</b-nav-item>
    <b-nav-item v-else @click="setOverlay('section3')">Cortes Finos</b-nav-item>
    <b-nav-item v-if="seccion4" style ="font-weight: bold;" @click="setOverlay('section4')">Línea Magra</b-nav-item>
    <b-nav-item v-else @click="setOverlay('section4')">Línea Magra</b-nav-item>
    <b-nav-item v-if="seccion5" style ="font-weight: bold;" @click="setOverlay('section5')">Cortes Frescos</b-nav-item>
    <b-nav-item v-else @click="setOverlay('section5')">Cortes Frescos</b-nav-item>
    </b-nav>
    <Practicocina v-if="this.seccion1"></Practicocina>
    <Especialidades v-if="this.seccion2"></Especialidades>
    <CortesFinos v-if="this.seccion3"></CortesFinos>
    <LineaMagra v-if="this.seccion4"></LineaMagra>
    <CortesFrescos v-if="this.seccion5"></CortesFrescos>
  </div>
</template>

<script>
import Practicocina from './sections/Practicocina.vue'
import Especialidades from './sections/Especialidades.vue'
import CortesFinos from './sections/CortesFinos.vue'
import LineaMagra from './sections/LineaMagra.vue'
import CortesFrescos from './sections/CortesFrescos.vue'
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
      Practicocina,
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
      }
    }
  }
</script>