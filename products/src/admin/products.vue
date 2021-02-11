<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Productos</h5>
        </b-col>
        <b-col md="4">
          <b-button v-b-modal.addProduct style="width: 60%; margin-right: 1rem"> 
            <b-icon-plus/>
            <small> Añadir Producto </small>
          </b-button>
        </b-col>
      </b-row>
      <hr>
      <b-container fluid="lg" style="padding-bottom:100px;">
        <b-form-row style="padding-top:20px;" deck v-for="article in articles" v-bind:key="article.productId">
            <b-col md="3">
                <img v-if="article.img != ''" style="height: 4rem;" :src="article.img" />
                <img v-else style="height: 4rem;" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'"/>
            </b-col>
            <b-col md="6"> 
                <label style="padding-top:20px;"> {{article.name}} </label> 
            </b-col>
            <b-col md="3" style="padding-top:20px;"> 
                <b-button v-b-modal.detalInfo variant="link" @click="updateInfo(
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
            <b-modal id="detalInfo" title="Información Detallada">
                <b-row>
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
                </b-row>
            </b-modal>
            <b-modal id="addProduct" title="Agregar Producto">
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
      </b-container>
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
        // this.productId = id

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
    },
  }
</script>