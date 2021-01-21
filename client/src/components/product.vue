<template>
<!-- <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on bottom
</button> -->

<br>
<br>
<br>
<br>
<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on right
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on bottom
</button>

<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on left
</button>
<br>
<br>
<br>
<br>


  <div class = "catalogue">
    <div class="row row-cols-1 row-cols-md-4" >
      <div v-for="product in products" :key="product.name" class="card" style="width: 18rem;">
        <img class="card-img-top" :src="getImgUrl(product)" alt= "img">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.definition }}</p>
          <h6 class="card-text"> ${{ product.price }}.00 MXN</h6>
          <a href="#" class="btn btn-primary">Agregar Carrito</a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- <form name="ShoppingList">
    <fieldset>
        <legend>Shopping cart</legend>
        <label>Item: <input type="text" name="name"></label>
        <label>Quantity: <input type="text" name="data"></label>

        <input type="button" value="Save"   onclick="SaveItem()">
        <input type="button" value="Update" onclick="ModifyItem()">
        <input type="button" value="Delete" onclick="RemoveItem()">
    </fieldset>
    <div id="items_table">
        <h2>Shopping List</h2>
        <table id="list"></table>
        <label><input type="button" value="Clear" onclick="ClearAll()">
        * Delete all items</label>
    </div>
</form> -->
</template>

<script>

export default {
    name: "Product",
  data: () => {
    return {
      products: [
        {name: "Tozinett", definition: "Definición Producto 1", id: 1, price: 100, count: 0, addToCart: false, img: "prod-1.jpg"},
        {name: "Tocino Ahumado Premium", definition: "Definición Producto 2", id: 2, price: 200, count: 0, addToCart: false, img: "prod-2.jpg"},
        {name: "Tochino Ahumado Extra Fino", definition: "Definición Producto 3", id: 3, price: 300, count: 0, addToCart: false, img: "prod-3.jpg"},
        {name: "Pierna Ahumada Golden Line", definition: "Definición Producto 4", id: 4, price: 300, count: 0, addToCart: false, img: "prod-4.jpg"},
        {name: "Lomo Ahumado en Pimienta ", definition: "Definición Producto 5", id: 5, price: 200, count: 0, addToCart: false, img: "prod-5.jpg"},
        {name: "Lomo Ahumado", definition: "Definición Producto 6", id: 6, price: 1100, count: 0, addToCart: false, img: "prod-6.jpg"},
        {name: "Lomo Adobado", definition: "Definición Producto 7", id: 7, price: 3100, count: 0, addToCart: false, img: "prod-7.jpg"},
        {name: "Carne Adobada", definition: "Definición Producto 8", id: 8, price: 400, count: 0, addToCart: false, img: "prod-8.jpg"},
        {name: "Costilla Chipotle-BBQ", definition: "Definición Producto 9", id: 9, price: 500, count: 0, addToCart: false, img: "prod-9.jpg"},
        {name: "Costiliitas BBQ Original", definition: "Definición Producto 10", id: 10, price: 200, count: 0, addToCart: false, img: "prod-10.jpg"},
        {name: "Costilla Mostaza-Chiltepín", definition: "Definición Producto 11", id: 11, price: 400, count: 0, addToCart: false, img: "prod-11.jpg"},
        {name: "Carne Marinada para Asar", definition: "Definición Producto 12", id: 12, price: 200, count: 0, addToCart: false, img: "prod-12.jpg"},
        {name: "Jamón sabor piña", definition: "Definición Producto 13", id: 13, price: 500, count: 0, addToCart: false, img: "prod-13.jpg"},
      ]
    }
  },
  methods: { 
    getImgUrl(product) {
      console.log(require('../assets/' + product.img))
      return require('../assets/' + product.img)
    },
    shoppingCartPopovrt () {

    }
  }
}
</script>

<style scoped>
    .catalogue {
        background: #fff;
        text-align: center;
        padding: 50px;
        justify-content: center;
    }
    .card {
      margin-top: 10px;
      margin-left: 1px;
      margin-right: 1px;
    }
    
</style>