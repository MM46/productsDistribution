<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Practicocina</h1>
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
        this.articles.push({productId: 1, name: "Salsa Roja Pierna de Cerdo", weight: 283, individualPrice: 50, boxPrice: 993, piecesPerBox: 20, img: "1"})
        this.articles.push({productId: 2, name: "Salsa Verde Pierna de Cerdo", weight: 283, individualPrice: 50, boxPrice: 993, piecesPerBox: 20, img: "2"})
        this.articles.push({productId: 3, name: "Cochinita Pierna de Cerdo", weight: 250, individualPrice: 33, boxPrice: 1285, piecesPerBox: 20, img: "3"})
        this.articles.push({productId: 4, name: "Carnitas Pierna de Cerdo", weight: 250, individualPrice: 33, boxPrice: 1285, piecesPerBox: 20, img: "4"})
        this.articles.push({productId: 5, name: "Chilorio Pierna de Cerdo", weight: 250, individualPrice: 33, boxPrice: 1285, piecesPerBox: 20, img: "5"})
        this.articles.push({productId: 6, name: "Carne en Salsa de Adobo", weight: 600, individualPrice: 93, boxPrice: 930, piecesPerBox: 10, img: "6"})
        this.articles.push({productId: 7, name: "Carne en Salsa Morita", weight: 600, individualPrice: 93, boxPrice: 930, piecesPerBox: 10, img: "7"})
        this.articles.push({productId: 8, name: "Deshebrada de Cerdo", weight: 250, individualPrice: 33, boxPrice: 1285, piecesPerBox: 9, img: "8"})

      },
      getImgUrl(img) {
        var images = require.context('./../../assets/Imagenes/practicocina/', false, /\.jpg$/)
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