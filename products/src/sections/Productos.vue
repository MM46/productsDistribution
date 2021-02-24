<template>
  <mdb-container>
    <mdb-row>
      <mdb-col lg="12">
        <mdb-navbar color="dark" light class="lighten-3 py-4 mb-4">
          <mdb-navbar-toggler>
            <mdb-navbar-nav class="ml-auto"> 
              <div v-for="section in sections" v-bind:key="section.section">
                <mdb-nav-item
                v-bind:class="{ navitem: section.visible}" 
                :active='section.visible'
                @click="setOverlay(section.section)"
                >
                  {{section.name}}
                </mdb-nav-item>
              </div>
            </mdb-navbar-nav>
          </mdb-navbar-toggler>
        </mdb-navbar>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col lg="12">
        <Section class="overlay"
        :name="title"
        :articles="articles"
        />
      </mdb-col>
    </mdb-row>
    <br><br><br><br>
  </mdb-container>
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
