<template>
  <div class="container">
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Agregar Sección</div>
          <div class="card-body">
            <!-- <form> -->
              <b-row>
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
                  <b-button
                    type="submit"
                    value="Submit"
                    style="width: 100%"
                    @click="addSection"
                  > Añadir Sección </b-button>
                </b-col>
              </b-row>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "./../firebaseConfig";
export default {
    data() {
      return {
        name: null,
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
 methods: {
    sectionAddedSuccesfully(section){
        this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La sección ' + section + ' ha sido agregada exitosamente.',
            showConfirmButton: false,
            timer: 3000
        })
    },
    addSection() {
      const db = firebase.firestore();
        db.collection("sections").doc(this.name).set({name: this.name, products: []})
        .then(() => {
            this.sectionAddedSuccesfully(this.name)
          })
          .catch((error) => {
            console.error("No se pudo agregar el producto. error:", error);
          });
     },
  }
};
</script>