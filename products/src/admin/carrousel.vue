<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-form-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Carrousel</h5>
        </b-col>
        <b-col md="4">
          <b-button v-b-modal.addImageModal style="width: 60%; margin-right: 1rem"> 
            <b-icon-plus/>
            <small> Añadir imagen </small>
          </b-button>
        </b-col>
      </b-form-row>
      <hr>
      <b-overlay :show="this.carrouselImages.length == 0" rounded="sm" >
        <b-container fluid="lg" style="padding-bottom:100px;">
          <b-form-row style="background: #f7f7f7; padding: 10px">
              <b-col md="4">
                  <h6> Imagen </h6>
              </b-col>
              <b-col md="6">
                  <h6> Link de la imagen </h6>
              </b-col>
              <b-col md="2"></b-col>
          </b-form-row>
          <b-form-row style="padding-top:20px;" deck v-for="img in carrouselImages" v-bind:key="img.id">
            <b-col md="4">
              <b-img center v-if="img.img != ''" :src="img.img" fluid></b-img>
            </b-col>
            <b-col md="6">
              <div>
                <small><b-link @click="openNewTab(img.img)" >{{img.img}}</b-link></small>
              </div>
            </b-col>
            <b-col md="2">
              <b-button style="margin-top:10px" variant="light" @click="deleteImageAlert(img.id)">
                <b-icon-trash-fill variant="dark" font-scale="1"></b-icon-trash-fill>
              </b-button> 
            </b-col>
           <div class="divider" />
          </b-form-row>
        </b-container>
      </b-overlay>
    </b-overlay>
    <b-modal 
      id="addImageModal" 
      title="Agregar nueva Imagen a Carrousel" 
      ok-variant="primary"
      ok-title="Añadir Imagen"
      cancel-hidden="true"
      ok-only
      @ok="addImageToCarrousel"
      @close="clearData"
      >
      <b-container fluid="lg" style="padding-bottom:100px;">
        <b-form-row style="padding-top:50px;">
            <b-col md="12">
                <div v-if="imageData!=null">
                  <h6>Imagen a agregar:</h6>
                    <b-overlay :show="loadingPhoto">
                      <b-img center :src="img" fluid></b-img>
                        <br><br>
                    </b-overlay>
                </div> 
            </b-col>
        </b-form-row>
        <br>
        <b-form-row>
          <b-col md="12">
            <input 
              type="file" 
              ref="input1" 
              accept="image/*" 
              @change="previewImage"
              style="width: 100%"
              fluid
            >
            <br>
          </b-col>
        </b-form-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import {BIconTrashFill, BIconPlus} from 'bootstrap-vue'
import utils from "../utils/utils"
  export default {
    data() {
      return {
        img: '',
        imageData: null,
        carrouselImages: [],
        loadingPhoto: false,
      }
    },
    components: {
      BIconTrashFill,
      BIconPlus,
    },
    mounted() {
      this.carrouselImages = utils.getImages()
    },
    methods: {
      deleteImageAlert(id){
        utils.areYouSureAlert(
          this.$swal.fire,
          "La imagen sera eliminada permanentemente.", 
          "carrousel", 
          id, 
          'Operación Exitosa', 
          'La imagen fue eliminada del Carrousel',
          'Error', 
          'No se pudo eliminar la imagen',
        )
          setTimeout(() => {
            this.carrouselImages = utils.getImages()
          }, 5000);
      },
        openNewTab(link){
          utils.openNewTab(link)
        },
        clearData() {
          this.img = null
          this.imageData = null
        },
        previewImage(event) {
          this.loadingPhoto = true
          this.uploadValue = 0
          this.img = null
          this.imageData = event.target.files[0]
          this.onUpload()
          setTimeout(() => {
            this.loadingPhoto = false
          }, 5000);
        },
        onUpload() {
          const storageRef = utils.fb.ref(`${this.imageData.name}`).put(this.imageData);
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
          utils.db.collection("carrousel")
          .add({img: this.img})
          .then(() => {
            utils.succesfullyAlert(this.$swal.fire, 'Operación Exitosa', "La imagen ha sido agregada exitosamente al Carrousel.")
            this.clearData()
            this.carrouselImages = utils.getImages()
          })
          .catch((error) => {
            utils.errorAlert('Error', 'No se pudo agregar la imagen')
            console.error(error);
          });
        },
    },
  }
</script>