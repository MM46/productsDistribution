<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Secciones</h5>
        </b-col>
        <b-col md="4">
          <b-button v-b-modal.addSection style="width: 60%; margin-right: 1rem"> 
            <b-icon-plus/>
            <small> Añadir Sección </small>
          </b-button>
        </b-col>
      </b-row>
      <hr>
      <b-modal id="addSection" title="Agregar Sección">
          <!-- <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Nombre del Producto:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productName" placeholder="Enter your name"></b-form-input>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Precio Individual:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productIndividualPrice" placeholder="Precio individual"></b-form-input>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Piezas por Caja:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productPiecesPerBox" placeholder="Piezas por Caja"></b-form-input>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Precio por Caja:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productBoxPrice" placeholder="Precio por Caja"></b-form-input>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Sección:</p>
              </b-col>
              <b-col md="6">
                  <select
                  v-model="productSection"
                  :disabled="true"
                  style="width: 100%; height: 80%"
                  class="modalDetailInfo"
                  >
                      <option> {{productSection}} </option>
                  </select>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Cajas en Stock:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productStockPieces" placeholder="Cajas en Stock"></b-form-input>
              </b-col>
          </b-row>
          <b-row>
              <b-col md="6">
                  <p class="modalDetailInfo" style="padding-top:6px;">Peso en gr:</p>
              </b-col>
              <b-col md="6">
                  <b-form-input style="font-size:12px;" :disabled="true" v-model="productWeight" placeholder="Peso en gr"></b-form-input>
              </b-col>
          </b-row> -->
      </b-modal>
      <!-- <b-container fluid="lg" style="padding-bottom:100px;">
        <b-form-row style="padding-top:20px;" deck v-for="article in articles" v-bind:key="article.productId">
            <b-col md="3">
                <img v-if="article.img != ''" style="height: 4rem;" :src="article.img" />
                <img v-else style="height: 4rem;" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'"/>
            </b-col>
            <b-col md="6"> 
                <label style="padding-top:20px;"> {{article.name}} </label> 
            </b-col>
            <b-col md="3" style="padding-top:20px;"> 
                <b-button v-b-modal.modal variant="link" @click="updateInfo(
                    article.name, 
                    article.boxPrice, 
                    article.img, 
                    article.individualPrice, 
                    article.piecesPerBox, 
                    article.section, 
                    article.stockPieces, 
                    article.weight
                    )"> Ver más información </b-button> 
            </b-col>
          <hr>
        </b-form-row>
      </b-container> -->
    </b-overlay>
  </div>
</template>

<script>
import firebase from "../firebaseConfig"
  export default {
    data() {
      return {
        articles: [],
        productName: null,
        productBoxPrice: null,
        productImg: null,
        productIndividualPrice: null,
        productPiecesPerBox: null,
        productSection: null,
        productStockPieces: null,
        productWeight: null,
      }
    },
    components: {

    },
    mounted() {
      this.getAllProducts()
    },
    methods: {
        updateInfo(name, boxPrice, img, individualPrice, piecesPerBox, section, stockPieces, weight){
            this.productName = name
            this.productBoxPrice = boxPrice
            this.productImg = img
            this.productIndividualPrice = individualPrice
            this.productPiecesPerBox = piecesPerBox
            this.productSection = section
            this.productStockPieces = stockPieces
            this.productWeight = weight
        },
        getAllProducts(){
        const db = firebase.firestore();
            db.collection("products")
            .get()
            .then((result) => {
                result.forEach(product => {
                    this.articles.push(product.data())
                });
            })
            .catch((error) => {
                console.log("No se pudieron cargar los productos. error:", error);
            });
        },
        articleAddedAlert(product) {
            const Toast = this.$swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
            })
            if(product.productId in this.$shoppingCartList){
            this.$shoppingCartList[product.productId].quantity += 1
            }else{
            this.$shoppingCartList[product.productId] = {product: product, quantity: 1}
            }
            Toast.fire({
            icon: 'success',
            title: product.name + ' ha sido añadido a tu carrito'
            })
        }
    },
  }
</script>