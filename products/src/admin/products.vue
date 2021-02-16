<template>
  <div>
    <b-overlay rounded="sm" >
      <br>
      <b-form-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <h5>Productos</h5>
        </b-col>
        <b-col md="4">
            <b-button :to="'agregarProducto'" style="width: 60%; margin-right: 1rem"> 
                <b-icon-plus/>
                <small> Añadir Producto </small>
            </b-button>
        </b-col>
      </b-form-row>
      <hr>
      <b-overlay :show="this.articles.length == 0" rounded="sm" >
            <b-container fluid="lg" style="padding-bottom:100px;">
                <b-form-row style="background: #f7f7f7; padding: 10px">
                    <b-col md="1">
                        <h6> Id </h6>
                    </b-col>
                    <b-col md="2">
                        <h6> Imagen </h6>
                    </b-col>
                    <b-col md="6">
                        <h6> Nombre del Producto </h6>
                    </b-col>
                    <b-col md="3"></b-col>
                </b-form-row>
                <b-form-row style="padding-top:20px;" deck v-for="article in articles" v-bind:key="article.productId">
                    <b-col md="1" style="padding-top:20px;">
                        <h6 > {{article.productId}} </h6>
                    </b-col>
                    <b-col md="2">
                        <b-img v-if="article.img != ''" :src="article.img" fluid center></b-img>
                        <b-img v-else :src="'https://firebasestorage.googleapis.com/v0/b/productsdistribution.appspot.com/o/imagenotavailable.jpg?alt=media&token=f58052f7-5666-4801-8721-779b0d4db7b4'" fluid center></b-img>
                    </b-col>
                    <b-col md="6"> 
                        <label style="padding-top:20px;"> {{article.name}} </label> 
                    </b-col>
                    <b-col md="3" style="padding-top:10px;"> 
                        <b-button 
                            style="margin-right: 5px" 
                            v-b-modal.detalInfo 
                            variant="dark" 
                            :style="'font-size:12px'"
                            @click="updateInfo(
                                article.name, 
                                article.boxPrice, 
                                article.img, 
                                article.individualPrice, 
                                article.piecesPerBox, 
                                article.section, 
                                article.stockPieces, 
                                article.weight,
                                article.productId
                            )"> 
                            
                            <b-icon-eye-fill/>  
                        </b-button> 
                        <b-button :style="'font-size:12px'" variant="light">
                            <b-icon-trash-fill variant="dark"></b-icon-trash-fill>
                        </b-button> 
                    </b-col>
                    <div class="divider" />
                </b-form-row>
                <b-modal id="detalInfo" title="Información Detallada" @ok="resetEdits" @cancel="resetEdits" @close="resetEdits" :ok-title="'Guardar Cambios'">
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Id del Producto:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="true" v-model="productId" placeholder="Id del Producto"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button :disabled ="true" variant="dark" :style="'font-size:12px'">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Nombre del Producto:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="nameEdit" v-model="productName" placeholder="Nombre del Producto"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('name')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Precio Individual:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="individualPriceEdit" v-model="productIndividualPrice" placeholder="Precio individual"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('individualPrice')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Piezas por Caja:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="piecesPerBoxEdit" v-model="productPiecesPerBox" placeholder="Piezas por Caja"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('piecesPerBox')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Precio por Caja:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="pricePerBoxEdit" v-model="productBoxPrice" placeholder="Precio por Caja"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('pricePerBox')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Sección:</p>
                        </b-col>
                        <b-col md="5">
                            <select
                            v-model="productSection"
                            :disabled="sectionEdit"
                            style="width: 100%; height: 80%"
                            class="modalDetailInfo"
                            >
                                <option v-for="section in this.sections" v-bind:key="section.name"> {{section.name}} </option>
                            </select>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('section')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Cajas en Stock:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="stockPiecesEdit" v-model="productStockPieces" placeholder="Cajas en Stock"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('stockPieces')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="5">
                            <p class="modalDetailInfo" style="padding-top:6px;">Peso en gr:</p>
                        </b-col>
                        <b-col md="5">
                            <b-form-input style="font-size:12px;" :disabled="weightEdit" v-model="productWeight" placeholder="Peso en gr"></b-form-input>
                        </b-col>
                        <b-col md="2">
                            <b-button variant="dark" :style="'font-size:12px'" @click="editField('weight')">
                                <b-icon-pencil-fill/>  
                            </b-button>
                        </b-col>
                    </b-form-row>
                </b-modal>
            </b-container>
        </b-overlay>
    </b-overlay>
  </div>
</template>

<script>
import {
    BIconPlus, 
    BIconTrashFill,
    BIconEyeFill,
    BIconPencilFill,
    } from 'bootstrap-vue'
import utils from "../utils/utils"
  export default {
    data() {
      return {
        sections: [],
        articles: [],
        productName: null,
        productBoxPrice: null,
        productImg: null,
        productIndividualPrice: null,
        productPiecesPerBox: null,
        productSection: null,
        productStockPieces: null,
        productWeight: null,
        productId: null,
        nameEdit: true,
        individualPriceEdit: true,
        piecesPerBoxEdit: true,
        pricePerBoxEdit: true,
        sectionEdit: true,
        stockPiecesEdit: true,
        weightEdit: true,
      }
    },
    components: {
        BIconPencilFill,
        BIconPlus,
        BIconTrashFill,
        BIconEyeFill,
    },
    mounted() {
        this.articles = utils.getAllProducts()
        this.sections = utils.getSections()
    },
    methods: {
        updateInfo(name, boxPrice, img, individualPrice, piecesPerBox, section, stockPieces, weight, id){
            this.productName = name
            this.productBoxPrice = boxPrice
            this.productImg = img
            this.productIndividualPrice = individualPrice
            this.productPiecesPerBox = piecesPerBox
            this.productSection = section
            this.productStockPieces = stockPieces
            this.productWeight = weight
            this.productId = id

        },
        resetEdits(){
            this.nameEdit = true
            this.individualPriceEdit = true
            this.piecesPerBoxEdit = true
            this.pricePerBoxEdit = true
            this.sectionEdit = true,
            this.stockPiecesEdit = true
            this.weightEdit = true
        },
        editField(field){
            if(field == "name"){
                this.nameEdit = !this.nameEdit
            }
            if(field == "individualPrice"){
                this.individualPriceEdit = !this.individualPriceEdit
            }
            if(field == "piecesPerBox"){
                this.piecesPerBoxEdit = !this.piecesPerBoxEdit
            }
            if(field == "pricePerBox"){
                this.pricePerBoxEdit = !this.pricePerBoxEdit
            }
            if(field == "section"){
                this.sectionEdit = !this.sectionEdit
            }
            if(field == "stockPieces"){
                this.stockPiecesEdit = !this.stockPiecesEdit
            }
            if(field == "weight"){
                this.weightEdit = !this.weightEdit
            }
        }
    },
  }
</script>