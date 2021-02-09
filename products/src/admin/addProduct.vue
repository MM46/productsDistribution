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
                  <b-button
                    style="width: 100%"
                    @click="addProduct"
                  > Añadir Producto </b-button>
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
import { mapGetters } from "vuex";
import firebase from "./../firebaseConfig";
export default {
    data() {
      return {
        productsData: [],
        img: '',
        imageData: null,
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
    this.getSections()
  },
 methods: {
    clearData() {
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
      create () {
        const post = {
          photo: this.img,  
        }
        firebase.database().ref().push(post)
        .then((response) => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      },
    previewImage(event) {
      this.uploadValue = 0
      this.img = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload(){
      this.img = null
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
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
    addProductToSection(data) {
      const db = firebase.firestore();
      const sectionRef = db.collection("sections").doc(data.section);

      return db.runTransaction(function(transaction) {
          return transaction.get(sectionRef).then(function(section) {
              if (!section.exists) {
                  throw "La sección no existe!";
              }
              const products = section.data().products
              products.push(data)
              transaction.update(sectionRef, { products: products });
          });
      }).then(function() {
          console.log("Transaction successfully committed!");
      }).catch(function(error) {
          console.log("Transaction failed: ", error);
      });
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
          this.create()
          const data = {name: this.name, weight: this.weight, individualPrice: this.individualPrice, boxPrice: this.boxPrice, piecesPerBox: this.piecesPerBox, img: this.img, section: this.selectedSection, stockPieces: this.stockPieces}
          const db = firebase.firestore()
            db.collection("products")
              .add(data)
              .then(() => {
                this.addProductToSection(data)
                this.productAddedSuccesfully(this.name)
              })
              .catch((error) => {
                console.error("No se pudo agregar el producto. error:", error);
              });
      }
     },
     getSections(){
      const db = firebase.firestore();
      this.sections = []
        db.collection("sections")
          .get()
          .then((result) => {
            result.forEach((section) => {
             this.sections.push({
                name: section.data().name,
              });
            });
          })
          .catch((error) => {
            console.log("No se pudieron cargar las secciones. error:", error);
          });
     },
    //  getProducts(){
    //   const db = firebase.firestore();
    //   this.productsData = []
    //     db.collection("products")
    //       .get()
    //       .then((result) => {
    //         result.forEach((product) => {
    //          this.productsData.push({
    //             id: product.id,
    //             name: product.data().name,
    //             img: product.data().img,
    //             boxPrice: product.data().boxPrice,
    //             individualPrice: product.data().individualPrice,
    //             piecesPerBox: product.data().piecesPerBox,
    //             section: product.data().section,
    //             weight: product.data().weight,
    //           });
    //         });
    //       })
    //       .catch((error) => {
    //         console.log("No se pudieron cargar los productos. error:", error);
    //       });
    //  }
  }
};
</script>