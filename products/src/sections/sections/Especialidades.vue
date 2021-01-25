<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Especialidades </h1>
      <hr>
       <b-row>
        <b-card-group class="col-md-4" deck v-for="article in articles" :key="article" >
          <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-4"
          >
            <img :src="getImgUrl(article.img)" style = "width: 100%; height: auto;"/>
            <hr>
            <b-card-title> <h5> {{article.name}} </h5> </b-card-title>
            <h4 class="text-muted"> ${{article.individualPrice}}.00 MXN </h4>
            <b-button @click="articleAddedAlert(article.name)" class="buttonAddCart" block variant="light"> Añadir a Carrito </b-button>
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
        this.articles.push({productId: 9, name: "Discada", weight: 2000, individualPrice: 93, boxPrice: 961, piecesPerBox: 6, img: "discada"})
        this.articles.push({productId: 10, name: "Hamburguesa", weight: 1000, individualPrice: 167, boxPrice: 999, piecesPerBox: 6, img: "imagenotavailable"})
        this.articles.push({productId: 11, name: "Albondigas en Tomate", weight: 283, individualPrice: 58, boxPrice: 1155, piecesPerBox: 20, img: "imagenotavailable"})
        this.articles.push({productId: 12, name: "Pig Wings", weight: 750, individualPrice: 0, boxPrice: 0, piecesPerBox: 0, img: "pigwings"})
        this.articles.push({productId: 13, name: "Cabeza Preparada", weight: 500, individualPrice: 59, boxPrice: 2360, piecesPerBox: 20, img: "cabezapreparada"})
        this.articles.push({productId: 14, name: "Albondigas BBQ Chipotle", weight: 283, individualPrice: 64, boxPrice: 1280, piecesPerBox: 20, img: "imagenotavailable"})
        this.articles.push({productId: 15, name: "Marinada", weight: 1300, individualPrice: 147, boxPrice: 2050, piecesPerBox: 14, img: "imagenotavailable"})
        this.articles.push({productId: 16, name: "Costillas BBQ Chipotle", weight: 1000, individualPrice: 121.50, boxPrice: 1215, piecesPerBox: 10, img: "imagenotavailable"})
        this.articles.push({productId: 17, name: "Costillas Mostaza Chiltepin", weight: 1000, individualPrice: 124, boxPrice: 1240, piecesPerBox: 10, img: "costillasmostazachiltepin"})
        this.articles.push({productId: 18, name: "Adobada", weight: 750, individualPrice: 94, boxPrice: 1310, piecesPerBox: 14, img: "adobada"})
        this.articles.push({productId: 19, name: "Pulled Pork", weight: 400, individualPrice: 65, boxPrice: 1300, piecesPerBox: 10, img: "pulledpork"})
        this.articles.push({productId: 20, name: "Costillas Hot Ribs", weight: 1000, individualPrice: 140, boxPrice: 2730, piecesPerBox: 9, img: "costillashotribs"})

      },
      getImgUrl(img) {
        var images = require.context('./../../assets/Imagenes/especialidades/', false, /\.jpg$/)
        return images('./' + img + ".jpg")
      },
      articleAddedAlert(article) {
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

        Toast.fire({
          icon: 'success',
          title: article + ' ha sido añadido a tu carrito'
        })
      }
    },
  }
</script>

<style scoped>
h4 {
  font-weight: bold;
  color: #970000 !important;
}
img {
  max-width: 250px;
  height: 200px !important;
}
h5 {
  font-weight: bold;
  color: #000 !important;
}
.buttonAddCart {
  font-weight: bold;
  color: #292929 !important;
  background-color:transparent
}
</style>