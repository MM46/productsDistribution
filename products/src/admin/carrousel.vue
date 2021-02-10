<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <h5>Carrousel</h5>
      <hr>
      <b-container fluid="lg" style="padding-bottom:100px;">
        <b-row style="padding-top:20px;">
            <b-col md="12">
                <div v-if="imageData!=null">                     
                    <img class="carrouselPreview" :src="img">
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
            </b-col>
            <br><br><br><br>
            <b-col md="12">
                <b-button
                style="width: 100%"
                @click="addImageToCarrousel"
                > Añadir Imagen al Carrousel </b-button>
            </b-col>
          <hr>
        </b-row>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import firebase from "../firebaseConfig"
  export default {
    data() {
      return {
        img: '',
        imageData: null,
      }
    },
    components: {

    },
    mounted() {
    //   this.getAllProducts()
    },
    methods: {
        clearData() {
            this.img = null
            this.imageData = null
        },
        imageAddedSuccesfully(){
            this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'La imagen ha sido agregada exitosamente al Carrousel.',
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
        addImageToCarrousel() {
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
        // updateInfo(name, boxPrice, img, individualPrice, piecesPerBox, section, stockPieces, weight){
        //     this.productName = name
        //     this.productBoxPrice = boxPrice
        //     this.productImg = img
        //     this.productIndividualPrice = individualPrice
        //     this.productPiecesPerBox = piecesPerBox
        //     this.productSection = section
        //     this.productStockPieces = stockPieces
        //     this.productWeight = weight
        // },
        // getAllProducts(){
        // const db = firebase.firestore();
        //     db.collection("products")
        //     .get()
        //     .then((result) => {
        //         result.forEach(product => {
        //             this.articles.push(product.data())
        //         });
        //     })
        //     .catch((error) => {
        //         console.log("No se pudieron cargar los productos. error:", error);
        //     });
        // },
        // articleAddedAlert(product) {
        //     const Toast = this.$swal.mixin({
        //     toast: true,
        //     position: 'bottom-end',
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: false,
        //     didOpen: (toast) => {
        //         toast.addEventListener('mouseenter', this.$swal.stopTimer)
        //         toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        //     }
        //     })
        //     if(product.productId in this.$shoppingCartList){
        //     this.$shoppingCartList[product.productId].quantity += 1
        //     }else{
        //     this.$shoppingCartList[product.productId] = {product: product, quantity: 1}
        //     }
        //     Toast.fire({
        //     icon: 'success',
        //     title: product.name + ' ha sido añadido a tu carrito'
        //     })
        // }
    },
  }
</script>