<template>
  <div>
    <b-overlay rounded="sm" >
      <hr>
      <h1>Cortes Finos</h1>
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
        this.articles.push({productId: 21, name: "Rib Eye", weight: 300, individualPrice: 42, boxPrice: 2475, piecesPerBox: 60, img: "ribeye"})
        this.articles.push({productId: 22, name: "Loin Chop", weight: 283, individualPrice: 38, boxPrice: 2255, piecesPerBox: 60, img: "loinchop"})
        this.articles.push({productId: 23, name: "Steak de Cerdo", weight: 500, individualPrice: 76.50, boxPrice: 2295, piecesPerBox: 30, img: "steakcerdo"})
        this.articles.push({productId: 24, name: "T-Bone", weight: 300, individualPrice: 37.50, boxPrice: 2250, piecesPerBox: 60, img: "tbone"})
        this.articles.push({productId: 25, name: "Filete Mignón", weight: 585, individualPrice: 126, boxPrice: 2645, piecesPerBox: 189, img: "filetemignon"})

      },
      getImgUrl(img) {
        var images = require.context('./../../assets/Imagenes/cortesfinos/', false, /\.jpg$/)
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