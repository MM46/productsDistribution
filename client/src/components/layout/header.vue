<template>
    <header class ="header">
        <ul class="nav justify-content-center">
        <li class="nav-item active">
            <a class="nav-link active" href="#">Inicio</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Productos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Sobre Nosotros</a>
        </li>
        </ul>
    </header>
</template>

<script>
// @click="swapComponent('home')"
// import Carrousel from './components/layout/carrousel.vue'
// import Product from './components/product.vue'

export default {
    name: "Header",
    // data: {
    //     currentComponent: 'home'
    // },
    // components: {
    //     'home': Carrousel,
    //     'products': Product,
    // },
    // methods: {
    //     swapComponent: function(component) {
    //         this.currentComponent = component
    //     }
    // }
}
</script>

<style scoped>
    .header {
        background: #fff;
        color: #fff;
        text-align: center;
        padding: 20px;
        margin-top: 20px;
    }
    .nav-item a {
        color: #000;
        font-weight: bold;
    }
    
    .active a {
        color: #ec6b00;
    }

    hr.style1 {
        border-top: 1px solid #8c8b8b;
        margin-left: 50px;
        margin-right: 50px;
    }
    .nav {
        margin-bottom: 20px;
        font-size: 120%;
        font-weight: medium;
    }
    
</style>