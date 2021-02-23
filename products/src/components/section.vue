<template>
  <mdb-container>
    <b-overlay>
      <h1 danger>{{name}}</h1>
      <br>
      <mdb-container>
        <mdb-row class="justify-content-md-center justify-content-between">
          <mdb-card-group class="col-md-4 pt-4" deck v-for="article in articles" :key="article.productId">
              <mdb-card reverse>
                <mdb-view hover cascade class="flex-fill"> 
                  <a href="#!">
                    <br>
                  <mdb-card-image v-if="article.img != ''" :src="article.img" fluid center/>
                      <mdb-card-image v-else :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'"/>
                      <mdb-mask overlay="white-slight" waves />
                  </a>
                </mdb-view>
                <mdb-card-body class="flex-fill" cascade>
                  <mdb-card-title><strong>{{article.name}}</strong></mdb-card-title>
                  <mdb-card-text>
                    Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam.
                  </mdb-card-text>
                    <span class="float-left">
                      ${{article.individualPrice}}.00 MXN
                    </span>
                    <span class="float-right">
                      <a class="active">
                        <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
                          <mdb-icon slot="reference" icon="star" class="ml-3"></mdb-icon>
                        </mdb-tooltip>
                      </a>
                    </span>
                    <br><br>
                  <mdb-btn color="info" @click="articleAddedAlert(article)"  block variant="light"> Añadir a Carrito </mdb-btn>
                </mdb-card-body>
              </mdb-card>
          </mdb-card-group>
        </mdb-row>
      </mdb-container>
    </b-overlay>
  </mdb-container>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      'name': String,
      'articles': Array
    },
    components: {

    },
    mounted() {
    },
    methods: {
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
        const newItem = {
          product: product,
          quantity: 1,
          id: product.productId
        }
        this.$store.dispatch("fetchCart", newItem)
        Toast.fire({
          icon: 'success',
          title: product.name + ' ha sido añadido a tu carrito'
        })
      }
    },
  }
</script>