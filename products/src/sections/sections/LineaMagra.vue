<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Línea Magra</h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" :key="article.productId" >
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img :src="getImgUrl(article.img)" style = "width: 100%; height: auto;"/>
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
        this.articles.push({productId: 26, name: "Pulpa de Lomo", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "pulpadelomo"})
        this.articles.push({productId: 27, name: "Carne Molida", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "carnemolida"})
        this.articles.push({productId: 28, name: "Fajitas de Filete", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "fajitasdefilete"})
        this.articles.push({productId: 29, name: "Filete Mariposa", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "filetemariposa"})
        this.articles.push({productId: 30, name: "Bistec de Pulpa", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "bistecdepulpa"})
        this.articles.push({productId: 31, name: "Pulpa de Pierna", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "pulpadepierna"})
        this.articles.push({productId: 32, name: "Puntas de Filete", weight: 600, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 60, img: "puntasdefilete"})

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
  max-width: 250px;
  height: 200px !important;
}
</style>