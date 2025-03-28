import { createStore } from 'vuex'
import api from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    cart: [],
    products: [],
    orders: [],
    notifications: []
  },
  getters: {
    isAuthenticated: state => !!state.token,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0)
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    CLEAR_TOKEN(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_TO_CART(state, product) {
      const existing = state.cart.find(item => item.id === product.id)
      existing ? existing.quantity++ : state.cart.push({ ...product, quantity: 1 })
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id)
      if (item) item.quantity = quantity
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    ADD_ORDER(state, order) {
      state.orders.unshift(order)
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n !== notification)
      }, 3000)
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await api.getProducts()
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        commit('ADD_NOTIFICATION', {
          type: 'error',
          message: 'Ошибка загрузки товаров'
        })
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials)
        commit('SET_TOKEN', response.data.token)
        commit('ADD_NOTIFICATION', {
          type: 'success',
          message: 'Добро пожаловать!'
        })
        return true
      } catch (error) {
        commit('ADD_NOTIFICATION', {
          type: 'error',
          message: 'Ошибка входа'
        })
        return false
      }
    },
    async register({ commit }, userData) {
      try {
        await api.register(userData)
        commit('ADD_NOTIFICATION', {
          type: 'success',
          message: 'Регистрация успешна'
        })
        return true
      } catch (error) {
        commit('ADD_NOTIFICATION', {
          type: 'error',
          message: 'Ошибка регистрации'
        })
        return false
      }
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN')
      commit('CLEAR_CART')
    },
    placeOrder({ commit, state }) {
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...state.cart],
        total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
      commit('ADD_ORDER', order)
      commit('CLEAR_CART')
    }
  }
})
