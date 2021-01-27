<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Practicocina</h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" v-bind:key="article.productId">
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img :src="getImgUrl(article.img)"/>
            <hr>
            <b-card-title> <h5> {{article.name}} </h5> </b-card-title>
            <h4> ${{article.individualPrice}} MXN </h4>
            <b-button @click="articleAddedAlert(article)" class="buttonAddCart" block variant="light"> Añadir a Carrito </b-button>
          </b-card>
        </b-card-group>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articles: [],
        counter: 0,
      }
    },
    components: {

    },
    mounted() {
      this.getArticles()
      
    },
    methods: {
      getArticles(){
        this.articles.push({productId: 1, name: "Salsa Roja Pierna de Cerdo", weight: 283, individualPrice: 50.00, boxPrice: 993, piecesPerBox: 20, img: "salsarojapiernadecerdo"})
        this.articles.push({productId: 2, name: "Salsa Verde Pierna de Cerdo", weight: 283, individualPrice: 50.00, boxPrice: 993, piecesPerBox: 20, img: "salsaverdepiernadecerdo"})
        this.articles.push({productId: 3, name: "Cochinita Pierna de Cerdo", weight: 250, individualPrice: 33.00, boxPrice: 1285, piecesPerBox: 20, img: "cochinitapiernadecerdo"})
        this.articles.push({productId: 4, name: "Carnitas Pierna de Cerdo", weight: 250, individualPrice: 33.00, boxPrice: 1285, piecesPerBox: 20, img: "carnitaspiernadecerdo"})
        this.articles.push({productId: 5, name: "Chilorio Pierna de Cerdo", weight: 250, individualPrice: 33.00, boxPrice: 1285, piecesPerBox: 20, img: "chiloriopiernadecerdo"})
        this.articles.push({productId: 6, name: "Carne en Salsa de Adobo", weight: 600, individualPrice: 93.00, boxPrice: 930, piecesPerBox: 10, img: "carneensalsadeadobo"})
        this.articles.push({productId: 7, name: "Carne en Salsa Morita", weight: 600, individualPrice: 93.00, boxPrice: 930, piecesPerBox: 10, img: "carneensalsamorita"})
        this.articles.push({productId: 8, name: "Deshebrada de Cerdo", weight: 250, individualPrice: 33.00, boxPrice: 1285, piecesPerBox: 9, img: "deshebradadecerdo"})

      },
      getImgUrl(img) {
        var images = require.context('./../../assets/Imagenes/products/', false, /\.jpg$/)
        return images('./' + img + ".jpg")
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

<style scoped>
img {
  max-width: auto;
  height: 150px !important;
  margin-left: 0.5px;
  margin-right: 0.5px;
}
</style>