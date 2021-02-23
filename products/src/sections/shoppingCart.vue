<template>
  <div class = "page">
    <div>
      <b-jumbotron>
        <br><br><br>
        <h2>Tu Carrito</h2>
      </b-jumbotron>
    </div>
    <div v-if="isEmpty">
      <hr>
        No tienes articulos en tu carrito!
        <br>
        <b-link :to="'productos'" variant="light" class="quantity">
          Ver Productos > 
        </b-link> 
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
                <b-list-group v-for="product in shoppingCartList" v-bind:key="product.id">
                  <b-container class="bv-example-row">
                    <br>
                    <b-row align-v="center">
                      <b-col md="3">
                        <b-img center v-if="product.product.img != ''" :src="product.product.img" fluid></b-img>
                        <b-img center v-else :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'" fluid></b-img>
                      </b-col>
                      <b-col md="6">
                        <h5> {{product.product.name}} </h5> 
                        <p> Precio Individual: ${{product.product.individualPrice}} </p> 
                      </b-col>
                      <b-col md="3">
                   <b-button v-on:click="subtracQuantityToProduct(product.id)" class="quantity">
                          <b-icon-dash-circle variant="secondary" font-scale="1"></b-icon-dash-circle> 
                        </b-button> 
                        {{product.quantity}}
                        <b-button v-on:click="addQuantityToProduct(product.id)" class="quantity">
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
                          <b-button variant="light" v-on:click="deleteProduct(product.id)" class="quantity">
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
import { mapGetters } from "vuex";
import { BIconTrashFill, BIconPlusCircle, BIconDashCircle } from 'bootstrap-vue'
export default {
    data() {
      return {
        shoppingCartList: {},
        isEmpty: true,
        shoppingCartItems: 0,
        amount: 0,
      }
  },
  computed: {
    ...mapGetters({
      cart: "cart",
      totalToPay: "totalToPay",
      totalProducts: "totalProducts"
    })
  },
  mounted() {
    this.getShoppingCart()
    this.getTotalToPay()
    this.getTotalProducts()
  },
  components: {
    BIconPlusCircle,
    BIconDashCircle,
    BIconTrashFill,
  },
  methods: {
    getShoppingCart(){
      this.shoppingCartList = this.$store.getters.cart.data
    },
    deleteProduct(id){
      this.$store.dispatch("deleteProduct", id)
      this.getShoppingCart()
      this.getTotalToPay()
      this.getTotalProducts()
    },
    addQuantityToProduct(id){
      this.$store.dispatch("addQuantity", id)
      this.getTotalToPay()
    },
    subtracQuantityToProduct(id){
      this.$store.dispatch("subtractQuantity", id)
      this.getTotalToPay()
    },
    getTotalToPay(){
      this.$store.dispatch("totalToPay")
      this.amount = this.$store.getters.totalToPay
    },
    getTotalProducts(){
      this.$store.dispatch("totalProducts")
      this.shoppingCartItems = this.$store.getters.totalProducts 
      this.shoppingCartItems == 0 ? this.isEmpty = true : this.isEmpty = false
    },
  }
}
</script>