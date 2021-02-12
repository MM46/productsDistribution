<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-form-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Secciones</h5>
        </b-col>
        <b-col md="4">
          <b-button :to="'agregarSeccion'" style="width: 60%; margin-right: 1rem"> 
              <b-icon-plus/>
              <small> Añadir Sección </small>
          </b-button>
        </b-col>
      </b-form-row>
      <hr>
      <b-overlay :show="this.sections.length == 0" rounded="sm" >
        <b-container fluid="lg" style="padding-bottom:100px;">
            <b-form-row style="background: #f7f7f7; padding: 10px">
                <b-col md="3">
                    <h6> Id de la Sección </h6>
                </b-col>
                <b-col md="7">
                    <h6> Nombre de la Sección </h6>
                </b-col>
                <b-col md="2"></b-col>
            </b-form-row>
            <b-form-row style="padding-top:20px;" deck v-for="section in sections" v-bind:key="section.id">
                <b-col md="3" style="padding-top:10px;">
                    <h6> {{section.id}} </h6>
                </b-col>
                <b-col md="7" style="padding-top:10px;">
                    <div>
                        <h6> {{section.name}} </h6>
                    </div>
                </b-col>
                <b-col md="2">
                    <b-button variant="light" @click="deleteSectionAlert(section.name)">
                        <b-icon-trash-fill variant="dark" font-scale="1"></b-icon-trash-fill>
                    </b-button> 
                </b-col>
               <div class="divider" />
            </b-form-row>
        </b-container>
      </b-overlay>
    </b-overlay>
  </div>
</template>

<script>
import {BIconTrashFill, BIconPlus} from 'bootstrap-vue'
import utils from "../utils/utils"
  export default {
    data() {
      return {
        sections: [],
      }
    },
    components: {
      BIconTrashFill,
      BIconPlus,
    },
    mounted() {
      this.sections = utils.getSections()
    },
    methods: {
      deleteSectionAlert(id){
        utils.areYouSureAlert(
          this.$swal.fire,
          "La sección sera eliminada permanentemente.", 
          "sections", 
          id, 
          'Operación Exitosa', 
          'La sección fue eliminada',
          'Error', 
          'No se pudo eliminar la sección',
        )
          setTimeout(() => {
            this.sections = utils.getSections()
          }, 5000);
      },
    },
  }
</script>