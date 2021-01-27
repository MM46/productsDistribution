<template>
  <div class = "page">
    <navigation-bar/>
    <div>
      <b-jumbotron>
        <br><br><br>
        <h2>Tu Carrito</h2>
      </b-jumbotron>
    </div>
    <div v-if="isEmpty">
      <hr>
        No tienes articulos en tu carrito!
      <hr>
    </div>
    <div v-else>
        <b-container class="bv-example-row bv-example-row-flex-cols">
          <b-row>
            <b-col md="8">
              <div class = "shoppingCart">
                <br><br>
                <b-container class="bv-example-row">
                    <b-row align-v="center">
                        <b-col md="6">
                          <h3>Carrito ({{this.shoppingCartItems}} Productos) </h3>
                        </b-col>
                      <b-col md="6"></b-col>
                    </b-row>
                </b-container>
                <br>
                <b-list-group v-for="product in shoppingCartList" v-bind:key="product.product.productId">
                  <b-container class="bv-example-row">
                    <br>
                    <b-row align-v="center">
                      <b-col md="3">
                      <img :src="getImgUrl(product.product.img)" style = "width: 70%; height: 70%;"/>
                      </b-col>
                      <b-col md="6">
                        <h5> {{product.product.name}} </h5> 
                        <p> Precio Individual: ${{product.product.individualPrice}} </p> 
                      </b-col>
                      <b-col md="3">
                        <b-button v-on:click="addQuantityToProduct(product.product.productId)" class="quantity">
                          <b-icon-plus-circle aria-hidden="true" variant="secondary" font-scale="1"></b-icon-plus-circle> 
                        </b-button> 
                          {{product.quantity}}
                        <b-button v-on:click="subtracQuantityToProduct(product.product.productId)" class="quantity">
                          <b-icon-dash-circle aria-hidden="true" variant="secondary" font-scale="1"></b-icon-dash-circle> 
                        </b-button> 
                      </b-col>
                    </b-row>
                    <br>
                    <b-row>
                     <b-col md="10">
                        <b-button variant="light" v-on:click="deleteProduct(product.product.productId)" class="quantity">
                          <b-icon-trash-fill aria-hidden="true" variant="secondary" font-scale="1"></b-icon-trash-fill>
                          Remover Producto 
                        </b-button> 
                      </b-col>
                      <b-col md="2">
                        <h5> ${{product.product.individualPrice * product.quantity}}  </h5> 
                      </b-col>
                    </b-row>
                    <hr>
                  </b-container>
                </b-list-group>
              </div>
            </b-col>
            <b-col md="4">
             <div class = "shoppingCart">
                <br><br>
                <b-container class="bv-example-row">
                    <b-row align-v="center">
                        <b-col md="12">
                          <h3>Total a Pagar:</h3>
                        </b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col md="6">
                          <h5>Subtotal:</h5>
                        </b-col>
                        <b-col md="6">
                          <p>$ {{this.totalToPay}} </p>
                        </b-col>
                    </b-row>
                    <br>
                    <b-row>
                      <b-col md="12"> 
                        <small> Nota: El costo de envío no esta incluido.</small>
                      </b-col>
                    </b-row>
                </b-container>
                <br>
              </div>
            </b-col>
          </b-row>
        </b-container>
      <hr>
    </div>
      <br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import { BIconTrashFill, BIconPlusCircle, BIconDashCircle } from 'bootstrap-vue'
export default {
    data() {
      return {
        shoppingCartList: {},
        isEmpty: true,
        shoppingCartItems: 0,
        totalToPay: 0,
      }
  },

  mounted() {
    this.shoppingCartList = this.$shoppingCartList
    this.shoppingCartItems = this.getShoppingCartQuantity()
    this.getTotalToPay()
    this.isEmpty = this.shoppingCartItems > 0 ? false : true
  },
  components: {
    BIconPlusCircle,
    BIconDashCircle,
    BIconTrashFill,
  },
  computed: {
  },
  methods: {
    deleteProduct(product){
      this.$delete(this.$shoppingCartList, product);
      this.isEmpty = Object.keys(this.shoppingCartList).length > 0 ? false : true
      this.getTotalToPay()
    },
    addQuantityToProduct(product){
      this.$set(this.$shoppingCartList[product], "quantity", this.$shoppingCartList[product]["quantity"] + 1);
      this.getTotalToPay()
    },
    subtracQuantityToProduct(product){
      if(this.$shoppingCartList[product]["quantity"] > 1){
      this.$set(this.$shoppingCartList[product], "quantity", this.$shoppingCartList[product]["quantity"] - 1);
      this.getTotalToPay()
      }
    },
    getImgUrl(img) {
      var images = require.context('./../../assets/Imagenes/products/', false, /\.jpg$/)
      return images('./' + img + ".jpg")
    },
    getShoppingCartQuantity(){
      return Object.keys(this.shoppingCartList).length
    },
    getTotalToPay(){
      this.totalToPay = 0
      let keys = Object.keys(this.shoppingCartList)
      keys.forEach(key => {
        this.totalToPay += (this.shoppingCartList[key].quantity * this.shoppingCartList[key].product.individualPrice)
      });
    },
  }
}
</script>

<style>
.page {
   background: #F5F5F5 !important;
}
.shoppingCart {
  align-content: start !important;
  background: white !important;
}
.shoppingCart h3{
   font-weight: medium !important;
}
.jumbotron {
  color: #000;
  font-weight: bold !important;
  background: #EEEEEE !important;
}
.jumbotron h2{
  font-size: 50px;
}
hr {
  color: #fff;
}
.quantity {
  background-color: transparent !important;
  border: none !important;
}
.customButton {
   font-weight: bold !important;
}
</style>
