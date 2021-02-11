<template>
  <div class="container">
    <br><br><br>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Agregar Producto</div>
          <div class="card-body">
              <b-row>
                <b-col md="4">
                  <label for="id">Id del Producto: </label>
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
                  <label for="name">Nombre del Producto: </label>
                </b-col>
                 <b-col md="8">
                  <input
                    v-model="name"
                    type="text"
                    style="width: 100%"
                  >
                </b-col>
                <br><br>
                <b-col md="4">
                  <label for="individualPrice">Precio Individual: </label>
                </b-col>
                <b-col md="8">
                  <input
                    v-model="individualPrice"
                    type="number"
                    min="1"
                    style="width: 100%"
                  >
                </b-col>
                <br><br>
                <b-col md="4">
                  <label for="piecesPerBox">Piezas por Caja: </label>
                </b-col>
                 <b-col md="8">
                  <input
                    v-model="piecesPerBox"
                    type="number"
                    min="1"
                    style="width: 100%"
                  >
                </b-col>
                <br><br>
                 <b-col md="4">
                  <label for="boxPrice">Precio por Caja: </label>
                 </b-col>
                  <b-col md="8">
                  <input
                    v-model="boxPrice"
                    type="number"
                    min="1"
                    style="width: 100%"
                  >
                  </b-col>
                  <br><br>
                 <b-col md="4">
                  <label for="weight">Peso en gr: </label>
                 </b-col>
                  <b-col md="8">
                  <input
                    v-model="weight"
                    type="number"
                    min="1"
                    style="width: 100%"
                  >
                  </b-col>
                  <br><br>
                 <b-col md="4">
                  <label for="section">Sección: </label>
                 </b-col>
                  <b-col md="8">
                  <div v-if="sections.length > 0"> 
                    <select
                      v-model="selectedSection"
                      style="width: 100%"
                    >
                    <option v-for="section in this.sections" v-bind:key="section.name"> {{section.name}} </option>
                    </select>
                    <br><br>
                   </div>
                   <div v-else>
                     No tienes secciones todavía.
                     <br><br>
                   </div>
                    <router-link to=agregarSeccion>
                       <b-button style="width: 100%"> Añadir Sección </b-button>
                       <br><br>
                    </router-link>
                  </b-col>
                 <b-col md="4">
                  <label for="stockPieces">Cajas en Almacén: </label>
                 </b-col>
                  <b-col md="8">
                  <input
                    v-model="stockPieces"
                    type="number"
                    min="1"
                    style="width: 100%"
                  >
                  </b-col>
                  <br><br>
                  <b-col md="12">
                    <div v-if="imageData!=null">                     
                    <img class="preview" height="150" width="200" :src="img">
                    <br><br>
                    </div> 
                    </b-col>
                <b-col md="12">
                  <input 
                    type="file" 
                    ref="input1" 
                    accept="image/*" 
                    @change="previewImage">
                    <br>
                    <small> Si no se elige la imagen se pondra una por default. </small>
                </b-col>
              <br><br><br><br>
                <b-col md="12">
                  <router-link to="agregarProducto">
                    <b-button
                      style="width: 100%"
                      @click="addProduct"
                    > Añadir Producto </b-button>
                  </router-link>
                </b-col>
              </b-row>
              <br><br><br><br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import utils from "../utils/utils"
export default {
    data() {
      return {
        productsData: [],
        img: '',
        imageData: null,
        id: Number,
        name: null,
        weight: null,
        individualPrice: null,
        piecesPerBox: null,
        boxPrice: null,
        section: null,
        stockPieces: null,
        sections: [],
        selectedSection: null,
      }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    this.getProductId()
    this.sections = utils.getSections()
  },
 methods: {
    getProductId() {
      utils.db.collection("utils").doc("utils")
        .get()
        .then((result) => {
          this.id = result.data().productId
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearData() {
      this.id = this.getProductId()
      this.name = null
      this.weight = null
      this.individualPrice = null
      this.boxPrice = null
      this.piecesPerBox = null
      this.img = null
      this.selectedSection = null
      this.stockPieces = null
    },
    productAddedSuccesfully(product){
        this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El Producto ' + product + ' ha sido agregado exitosamente.',
            showConfirmButton: false,
            timer: 3000
        })
        this.clearData()
    },
    previewImage(event) {
      this.uploadValue = 0
      this.img = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload(){
      this.img = null
      const storageRef = utils.fb.ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`, snapshot => {
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error => {console.log(error.message)},
      () => { this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.img=url;
            });
          }      
        );
    },
    checkAllFields() {
      let isClear = true
      let html = "<div> <label>Faltan los siguientes datos:</label><br>"
      if(this.name == null){
        html += "<small>- Nombre del Producto</small><br>"
        isClear = false
      }
      if(this.weight == null){
        html += "<small>- Peso en gr</small><br>"
        isClear = false
      }
      if(this.individualPrice == null){
         html += "<small>- Precio Individual</small><br>"
         isClear = false
      }
      if(this.boxPrice == null){
        html += "<small>- Precio por Caja</small><br>"
        isClear = false
      }
      if(this.piecesPerBox == null){
        html += "<small>- Piezas por Caja</small><br>"
        isClear = false
      }
      if(this.selectedSection == null){
        html += "<small>- Sección</small><br>"
        isClear = false
      }
      if(this.stockPieces == null){
        html += "<small>- Cajas en Almacén</small><br>"
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
    addProduct() {
      if(this.checkAllFields()){
          utils.createImg(this.img)
          const data = {
            productId: Number(this.id), 
            name: this.name, 
            weight: Number(this.weight), 
            individualPrice: Number(this.individualPrice), 
            boxPrice: Number(this.boxPrice), 
            piecesPerBox: Number(this.piecesPerBox), 
            img: this.img, 
            section: this.selectedSection, 
            stockPieces: Number(this.stockPieces)}
          const db = utils.db
          db.collection("products")
            .add(data)
            .then(() => {
              this.productAddedSuccesfully(this.name)
            })
            .catch((error) => {
              console.error("No se pudo agregar el producto. error:", error);
            });
            utils.updateProductId()
      }
     },
  }
};
</script>