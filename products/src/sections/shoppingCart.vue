<template>
  <div class = "page">
    <mdb-container>
    <br><br>
      <div class="row justify-content-center">
        <mdb-col md="8">
          <mdb-card>
            <br>
            <p class="h4 text-left mb-4 mr-4 ml-4">Carrito ({{this.shoppingCartItems}} Productos)</p>
            <mdb-list-group class="mr-4 ml-4" v-for="product in shoppingCartList" v-bind:key="product.id">
              <mdb-row> 
                <mdb-col md="2" class="mt-2">
                  <img v-if="product.product.img != ''" class="img-fluid" :src="product.product.img" alt="product"/>
                  <img v-else class="img-fluid" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'" alt="none"/>
                </mdb-col>
                <mdb-col md="6">
                  <mdb-row class="mt-2">
                    <mdb-col sm="12">
                      <h5> {{product.product.name}} </h5> 
                      <small> Precio Individual: ${{product.product.individualPrice}} </small> 
                      <p class="mt-2">Total: ${{getAmount(product.product.individualPrice, product.quantity)}} </p>
                    </mdb-col>
                  </mdb-row>
                </mdb-col>
                <mdb-col md="2">
                  <mdb-input 
                    type="number"
                    :min="1"
                    v-model="product.quantity"
                    v-on:input="productQuantity(product.id, product.quantity)"
                  />
                </mdb-col>
                <mdb-col md="2" class="mt-3">
                  <mdb-btn color="danger"  @click="deleteProduct(product.id)"> 
                    <mdb-icon icon="trash"/>
                  </mdb-btn>
                </mdb-col>
              </mdb-row>
              <hr>
            </mdb-list-group>
          </mdb-card>
        </mdb-col>
        <mdb-col md="4">
          <mdb-card>
            <mdb-card-body>
                <form action="#" @submit.prevent="submit">
                  <p class="h4 text-center mb-4">Total a Pagar:</p>
                  <mdb-row> 
                    <mdb-col md="6">
                      <h5>Subtotal:</h5>
                    </mdb-col>
                    <mdb-col md="6">
                      <p>$ {{this.totalToPay}} </p>
                    </mdb-col>
                  </mdb-row>
                  <small> Nota: El costo de envío no esta incluido.</small>
                  <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                      <b-button :to="'paymentMethod'" variant="primary">Ir a Pagar</b-button>
                    </div>
                  </div>
                </form>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </div>
      <br><br>
    </mdb-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
      return {
        shoppingCartList: {},
        isEmpty: true,
        shoppingCartItems: 0,
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
  },
  methods: {
    getAmount(price, quantity){
      return (price * quantity).toFixed(2)
    },
    getShoppingCart(){
      this.shoppingCartList = this.$store.getters.cart.data
    },
    deleteProduct(id){
      this.$store.dispatch("deleteProduct", id)
      this.getShoppingCart()
      this.getTotalToPay()
      this.getTotalProducts()
    },
    productQuantity(id, quantity){
      this.$store.dispatch("productQuantity", {id, quantity})
      this.getShoppingCart()
      this.getTotalToPay()
    },
    getTotalToPay(){
      this.$store.dispatch("totalToPay")
    },
    getTotalProducts(){
      this.$store.dispatch("totalProducts")
      this.shoppingCartItems = this.$store.getters.totalProducts 
      this.shoppingCartItems == 0 ? this.isEmpty = true : this.isEmpty = false
    },
  }
}
</script>