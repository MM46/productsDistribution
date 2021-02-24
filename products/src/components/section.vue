<template>
  <mdb-container>
    <b-overlay>
      <h1 danger>{{name}}</h1>
      <br>
      <mdb-container>
        <mdb-row class="justify-content-md-center justify-content-between">
          <mdb-card-group class="col-md-4 pt-4" deck v-for="article in articles" :key="article.productId">
            <mdb-card narrow ecommerce>
              <mdb-view cascade>
                <mdb-card-image v-if="article.img != ''" class="productImage" :src="article.img" top alt="sample photo"/>
                <mdb-card-image v-else class="productImage" :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'" top alt="sample photo" />
                <mdb-mask overlay="white-slight" waves />
              </mdb-view>
              <mdb-card-body class="text-center" cascade>
                <mdb-card-title>
                  <strong><a href="">{{article.name}}</a></strong>
                </mdb-card-title>
                <mdb-card-text>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.</mdb-card-text>
                <a href="" class="text-muted">
                  <small>Ver Producto</small>
                </a>
                <mdb-card-footer color="white" textColor="black" class="px-1">
                  <span class="float-left">
                    ${{article.individualPrice}} MXN
                  </span>
                  <span class="float-right">
                    <a>
                        <mdb-icon slot="reference" icon="star" class="ml-3"></mdb-icon>
                    </a>
                  </span>
                   <mdb-btn class="mt-5" color="dark" @click="articleAddedAlert(article)"  block variant="light"> Añadir a Carrito </mdb-btn>
                </mdb-card-footer>
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