<template>
    <div class="cart">
      <h2>Корзина</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        Ваша корзина пуста
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <div class="price">{{ item.price }} ₽ × {{ item.quantity }}</div>
          </div>
          <div class="item-actions">
            <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            <button @click="removeItem(item.id)" class="remove-btn">Удалить</button>
          </div>
        </div>
        <div class="cart-total">
          Итого: {{ cartTotal }} ₽
        </div>
        <button @click="placeOrder" class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const store = useStore()
      const router = useRouter()
  
      return {
        cartItems: computed(() => store.getters.cartItems),
        cartTotal: computed(() => store.getters.cartTotal),
        updateQuantity: (id, quantity) => store.dispatch('updateCartItem', { id, quantity }),
        removeItem: (id) => store.dispatch('removeFromCart', id),
        placeOrder: () => {
          store.dispatch('placeOrder')
          router.push('/orders')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .cart-total {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: right;
    margin: 1rem 0;
    padding-top: 1rem;
    border-top: 2px solid #eee;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 0.8rem;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .remove-btn {
    margin-left: 1rem;
    color: #ff5252;
  }
  </style>