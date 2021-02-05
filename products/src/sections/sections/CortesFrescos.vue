<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Cortes Frescos</h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" :key="article.productId" >
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img class = "productImage" :src="getImgUrl(article.img)" />
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
        this.articles.push({productId: 33, name: "Cabeza de Lomo", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "imagenotavailable"})
        this.articles.push({productId: 34, name: "Chamorros", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "imagenotavailable"})
        this.articles.push({productId: 35, name: "Back Ribs", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "imagenotavailable"})
        this.articles.push({productId: 36, name: "Pierna de Lomo", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "piernadelomo"})
        this.articles.push({productId: 37, name: "Pierna sin Hueso", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "imagenotavailable"})
        this.articles.push({productId: 38, name: "Pierna con Hueso", weight: 600, individualPrice: 42.00, boxPrice: 2475, piecesPerBox: 60, img: "imagenotavailable"})

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