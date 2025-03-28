<template>
    <div class="catalog">
      <h2>Каталог товаров</h2>
      <div class="products">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :is-authenticated="isAuthenticated"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import ProductCard from '@/components/ProductCard.vue'  // Исправлено .due → .vue
  
  export default {
    components: { ProductCard },
    setup() {
      const store = useStore()
  
      onMounted(() => {
        store.dispatch('fetchProducts')
      })
  
      return {
        products: computed(() => store.state.products),
        isAuthenticated: computed(() => store.getters.isAuthenticated),
        addToCart: (product) => store.dispatch('addToCart', product)
      }
    }
  }
  </script>