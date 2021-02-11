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
                        <img v-if="product.product.img != ''" style = "width: 70%; height: 70%;" :src="product.product.img" />
                        <img v-else style = "width: 70%; height: 70%;" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'"/>
                      </b-col>
                      <b-col md="6">
                        <h5> {{product.product.name}} </h5> 
                        <p> Precio Individual: ${{product.product.individualPrice}} </p> 
                      </b-col>
                      <b-col md="3">
                   <b-button v-on:click="subtracQuantityToProduct(product.product.productId)" class="quantity">
                          <b-icon-dash-circle variant="secondary" font-scale="1"></b-icon-dash-circle> 
                        </b-button> 
                        {{product.quantity}}
                        <b-button v-on:click="addQuantityToProduct(product.product.productId)" class="quantity">
                          <b-icon-plus-circle  variant="secondary" font-scale="1"></b-icon-plus-circle> 
                        </b-button> 
                      </b-col>
                    </b-row>
                    <br>
                    <b-row>
                     <b-col md="10">
                      <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        content-cols-sm
                        content-cols-lg="7"
                      >
                          <b-button variant="light" v-on:click="deleteProduct(product.product.productId)" class="quantity">
                            <b-icon-trash-fill variant="secondary" font-scale="1"></b-icon-trash-fill>
                            Remover Producto 
                          </b-button> 
                        </b-form-group>
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
                    <hr>
                    <b-row>
                      <b-col md="12"> 
                        <b-button block variant="primary">Ir a Pagar</b-button>
                      </b-col>
                    </b-row>
                </b-container>
                <br>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <br>
              <b-link :to="'productos'" variant="light" class="quantity">
                          Continuar Comprando > 
                </b-link> 
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