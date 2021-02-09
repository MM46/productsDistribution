<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Cortes Finos</h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" :key="article.productId" >
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img v-if="article.img != ''" class = "productImage" :src="article.img" />
            <img v-else class = "productImage" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'"/>
            <hr>
            <b-card-title> <h5> {{article.name}} </h5> </b-card-title>
            <h4> ${{article.individualPrice}} MXN </h4>
            <b-button @click="articleAddedAlert(article)" class="buttonAddCart" block variant="light"> Añadir a Carrito </b-button>
          </b-card>
        </b-card-group>
      </b-row>
    </b-overlay>
    <br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import firebase from "../../firebaseConfig"
  export default {
    data() {
      return {
        articles: [],
      }
    },
    components: {

    },
    mounted() {
      this.getArticles()
    },
    methods: {
      getArticles(){
      const db = firebase.firestore();
        db.collection("sections").doc("Cortes Finos")
          .get()
          .then((result) => {
            this.articles = result.data().products
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