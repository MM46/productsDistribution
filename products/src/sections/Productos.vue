<template>
  <div>
    <hr>
      <header class= "productsnavbar"> 
        <b-navbar fixed toggleable="lg" type="dark" variant="dark">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <div v-for="section in sections" v-bind:key="section.section">
                <b-nav-item 
                  v-bind:class="{ navitem: section.visible}" 
                  :active='section.visible'
                  @click="setOverlay(section.section)"
                  >{{section.name}}</b-nav-item>
              </div>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </header>
      <Section class="overlay"
        :name="title"
        :articles="articles"
        />
  </div>
</template>

<script>
import utils from "../utils/utils"
  export default {
    data() {
      return {
        sections: [],
        title: null,
        articles: [],
      }
    },
    components: {
    },
    mounted() {
      this.getSections()
    },
    methods: {
      getSections(){
        const db = utils.db
        db.collection("sections")
          .get()
          .then((result) => {
            let index = 1
            result.forEach(doc => {
              if(index == 1){
                this.sections.push({section: index, visible: true, name: doc.data().name})
                this.title = doc.data().name
                this.articles = utils.getProductsPerSection(doc.data().name)
              }else{
                this.sections.push({section: index, visible: false, name: doc.data().name})
              }
              index++
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      setOverlay(selectedSection){
        this.sections.forEach(section => {
          if(section.section == selectedSection){
              section.visible = true
              this.title = section.name
              this.articles = utils.getProductsPerSection(section.name)
          }else{
            section.visible = false
          }
        });
      },
    }
  }
</script>
