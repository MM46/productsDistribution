<template>
  <div class="container">
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Agregar Sección</div>
          <div class="card-body">
              <b-row>
                <b-col md="4">
                  <label for="id">Id de la Sección: </label>
                </b-col>
                 <b-col md="8">
                  <input
                    :disabled="true"
                    v-model="id"
                    type="number"
                    style="width: 100%"
                  >
                </b-col>
                <br><br>
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
                  <router-link to="agregarSeccion">
                    <b-button
                      type="submit"
                      value="Submit"
                      style="width: 100%"
                      @click="addSection"
                    > Añadir Sección </b-button>
                  </router-link>
                </b-col>
              </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import firebase from "./../firebaseConfig"
import utils from "../utils/utils"
export default {
    data() {
      return {
        name: null,
        id: Number,
      }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    this.getSectionId()
  },
 methods: {
    clearData() {
      this.id = this.getSectionId()
      this.name = null
    },
    getSectionId() {
      utils.db.collection("utils").doc("utils")
        .get()
        .then((result) => {
          this.id = result.data().sectionId
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sectionAddedSuccesfully(section){
        this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La sección ' + section + ' ha sido agregada exitosamente.',
            showConfirmButton: false,
            timer: 3000
        })
        this.clearData()
    },
  checkAllFields() {
      let isClear = true
      let html = "<div> <label>Faltan los siguientes datos:</label><br>"
      if(this.name == null){
        html += "<small>- Nombre de la Sección</small><br>"
        isClear = false
      }
      html += "</div>"
      if(!isClear){
        this.$swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Error',
              html: html,
              showConfirmButton: true,
          })
      }
      return isClear
    },
    addSection() {
      if(this.checkAllFields()){
        const db = firebase.firestore();
          db.collection("sections").doc(this.name).set({name: this.name, sectionId: Number(this.id)})
          .then(() => {
              this.sectionAddedSuccesfully(this.name)
              this.$router.go(-1)
            })
            .catch((error) => {
              console.error("No se pudo agregar el producto. error:", error);
            });
            utils.updateSectionId()
      }
     },
  }
};
</script>