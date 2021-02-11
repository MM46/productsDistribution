<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Carrousel</h5>
        </b-col>
        <b-col md="4">
          <b-button v-b-modal.modal style="width: 60%; margin-right: 1rem"> 
            <b-icon-plus/>
            <small> Añadir imagen </small>
          </b-button>
        </b-col>
      </b-row>
      <hr>
      <b-container fluid="lg" style="padding-bottom:100px;">
        <b-row style="padding-top:20px;" deck v-for="img in carrouselImages" v-bind:key="img.img">
          <b-col md="3">
              <img class="center" v-if="img.img != ''" :src="img.img" />
          </b-col>
          <b-col md="9">
            <b-button variant="light">
              <b-icon-trash-fill variant="dark" font-scale="1"></b-icon-trash-fill>
              Remover Imagen 
            </b-button> 
          </b-col>
        </b-row>
        <b-row style="padding-top:50px;">
            <b-col md="12">
                <div v-if="imageData!=null">
                    <h5>Imagen a agregar</h5>                     
                    <img class="center" :src="img">
                    <br><br>
                </div> 
            </b-col>
        </b-row>
        <b-modal id="modal" title="Agregar nueva Imagen a Carrousel">
          <b-container fluid="lg" style="padding-bottom:100px;">
            <b-row>
              <b-col md="12">
                  <input 
                  type="file" 
                  ref="input1" 
                  accept="image/*" 
                  @change="previewImage">
                  <br>
              </b-col>
              <br><br><br><br>
              <b-col md="12">
                  <b-button
                  style="width: 100%"
                  @click="addImageToCarrousel"
                  > Añadir Imagen al Carrousel </b-button>
              </b-col>
            </b-row>
            <hr>
          </b-container>
        </b-modal>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import firebase from "../firebaseConfig"
import {BIconTrashFill, BIconPlus} from 'bootstrap-vue'
import utils from "../utils/utils"
  export default {
    data() {
      return {
        img: '',
        imageData: null,
        carrouselImages: [],
      }
    },
    components: {
      BIconTrashFill,
      BIconPlus,
    },
    mounted() {
      this.getAllImages()
    },
    methods: {
        clearData() {
          this.img = null
          this.imageData = null
        },
        imageAddedSuccesfully() {
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La imagen ha sido agregada exitosamente al Carrousel.',
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
        onUpload() {
        this.img = null
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`, snapshot => {
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error => {
              console.log(error.message)},
        () => { 
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  this.img = url;
                });
            }      
          );
        },
        addImageToCarrousel() {
          utils.createImg(this.img)
            const db = firebase.firestore();
            db.collection("carrousel")
            .add({img: this.img})
            .then(() => {
                this.imageAddedSuccesfully()
            })
            .catch((error) => {
                console.error("No se pudo agregar la Imagen. error:", error);
            });
        },
        getAllImages() {
          this.carrouselImages = []
          const db = firebase.firestore();
              db.collection("carrousel")
              .get()
              .then((result) => {
                  result.forEach(img => {
                      this.carrouselImages.push(img.data())
                  });
              })
              .catch((error) => {
                  console.log("No se pudieron cargar las imagenes. error:", error);
              });
        },
    },
  }
</script>