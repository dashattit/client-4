<template>
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="price">{{ product.price }} ₽</div>
      <button v-if="isAuthenticated" @click="$emit('add-to-cart', product)">
        В корзину
      </button>
      <router-link v-else to="/login" class="login-link">
        Войдите для покупки
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      },
      isAuthenticated: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>