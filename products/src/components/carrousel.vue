<template>
  <div class="carrousel">
    <mdb-carousel
      :items="carrouselImages"
      :interval="4000"
      controlls
      style="
      margin-left: 5rem; 
      margin-right: 5rem; 
      text-shadow: 1px 1px 2px #333; 
      "
      background="#00000"
    >
    </mdb-carousel>
  </div>
</template>

<script>
  import firebase from "./../firebaseConfig";
  export default {
    data() {
      return {
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
                    this.carrouselImages.push({img: true, src: image.data().img})
                });
            })
            .catch((error) => {
                console.log("No se pudieron cargar los productos. error:", error);
            });
        },
    }
  }
</script>
