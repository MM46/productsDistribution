<template>
  <div class="carrousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background=#000
      style="margin-left: 50px; margin-right: 50px;text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <b-carousel-slide v-for="img in carrouselImages" :key="img">
        <template #img>
          <img
            class="d-block img-fluid w-100"
            :src= img
            alt=""
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  import firebase from "./../firebaseConfig";
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        carrouselImages: []
      }
    },
    mounted() {
      this.importAll()
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      importAll() {
        const db = firebase.firestore();
            db.collection("carrousel")
            .get()
            .then((result) => {
                result.forEach(image => {
                    this.carrouselImages.push(image.data().img)
                });
            })
            .catch((error) => {
                console.log("No se pudieron cargar los productos. error:", error);
            });
        },
    }
  }
</script>
