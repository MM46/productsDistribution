import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    cart: {
      data: []
    },
    totalToPay: 0,
    totalProducts: 0,
  },
  getters: {
    user: (state) => state.user,
    cart: (state) => state.cart,
    totalToPay: (state) => state.totalToPay,
    totalProducts: (state) => state.totalProducts,
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_CART(state, data) {
      let index = state.cart.data.findIndex(item => item.id === data.id)
      index >= 0 ? state.cart.data[index].quantity = Number(state.cart.data[index].quantity + 1) : state.cart.data.push(data)
    },
    DELETE_PRODUCT(state, id) {
      let index = state.cart.data.findIndex(item => item.id === id)
      state.cart.data.splice(index, 1);
    },
    PRODUCT_QUANTITY(state, product) {
      let index = state.cart.data.findIndex(item => item.id === product.id)
      state.cart.data[index].quantity = Number(product.quantity)
    },
    GET_TOTAL_TO_PAY(state) {
      state.totalToPay = 0
      state.cart.data.forEach(item => {
        state.totalToPay += (item.quantity * item.product.individualPrice)
      });
      state.totalToPay = state.totalToPay.toFixed(2)
    },
    GET_TOTAL_PRODUCTS(state) {
      state.totalProducts = state.cart.data.length
    },
    EMPTY_CART(state) {
      state.cart.data = []
      state.totalToPay = 0
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchCart({ commit }, cart) {
        commit("SET_CART", cart);
    },
    emptyCart({ commit }) {
        commit("EMPTY_CART");
    },
    totalToPay({ commit }) {
        commit("GET_TOTAL_TO_PAY");
    },
    productQuantity({ commit }, product) {
        commit("PRODUCT_QUANTITY", product);
    },
    deleteProduct({ commit }, id) {
        commit("DELETE_PRODUCT", id);
    },
    totalProducts({ commit }) {
        commit("GET_TOTAL_PRODUCTS");
    },
  },
  plugins: [createPersistedState()]
});