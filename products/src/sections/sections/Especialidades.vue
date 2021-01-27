<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Especialidades </h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" :key="article.productId" >
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img :src="getImgUrl(article.img)" />
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
        this.articles.push({productId: 9, name: "Discada", weight: 2000, individualPrice: 93.00, boxPrice: 961, piecesPerBox: 6, img: "discada"})
        this.articles.push({productId: 10, name: "Hamburguesa", weight: 1000, individualPrice: 167.00, boxPrice: 999, piecesPerBox: 6, img: "imagenotavailable"})
        this.articles.push({productId: 11, name: "Albondigas en Tomate", weight: 283, individualPrice: 58.00, boxPrice: 1155, piecesPerBox: 20, img: "imagenotavailable"})
        this.articles.push({productId: 12, name: "Pig Wings", weight: 750, individualPrice: 0.00, boxPrice: 0, piecesPerBox: 0, img: "pigwings"})
        this.articles.push({productId: 13, name: "Cabeza Preparada", weight: 500, individualPrice: 59.00, boxPrice: 2360, piecesPerBox: 20, img: "cabezapreparada"})
        this.articles.push({productId: 14, name: "Albondigas BBQ Chipotle", weight: 283, individualPrice: 64, boxPrice: 1280, piecesPerBox: 20, img: "imagenotavailable"})
        this.articles.push({productId: 15, name: "Marinada", weight: 1300, individualPrice: 147.00, boxPrice: 2050, piecesPerBox: 14, img: "imagenotavailable"})
        this.articles.push({productId: 16, name: "Costillas BBQ Chipotle", weight: 1000, individualPrice: 121.50, boxPrice: 1215, piecesPerBox: 10, img: "imagenotavailable"})
        this.articles.push({productId: 17, name: "Costillas Mostaza Chiltepin", weight: 1000, individualPrice: 124.00, boxPrice: 1240, piecesPerBox: 10, img: "costillasmostazachiltepin"})
        this.articles.push({productId: 18, name: "Adobada", weight: 750, individualPrice: 94.00, boxPrice: 1310, piecesPerBox: 14, img: "adobada"})
        this.articles.push({productId: 19, name: "Pulled Pork", weight: 400, individualPrice: 65.00, boxPrice: 1300, piecesPerBox: 10, img: "pulledpork"})
        this.articles.push({productId: 20, name: "Costillas Hot Ribs", weight: 1000, individualPrice: 140.00, boxPrice: 2730, piecesPerBox: 9, img: "costillashotribs"})

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