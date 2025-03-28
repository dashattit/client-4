<template>
    <div class="orders">
      <h2>Мои заказы</h2>
      <div v-if="orders.length === 0" class="empty-orders">
        У вас пока нет заказов
      </div>
      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order">
          <div class="order-header">
            <div class="order-id">Заказ #{{ order.id }}</div>
            <div class="order-date">{{ formatDate(order.date) }}</div>
          </div>
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <div>{{ item.name }}</div>
            <div>{{ item.quantity }} × {{ item.price }} ₽ = {{ item.quantity * item.price }} ₽</div>
          </div>
          <div class="order-total">
            Итого: {{ order.total }} ₽
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    setup() {
      const store = useStore()
  
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
  
      return {
        orders: computed(() => store.state.orders),
        formatDate
      }
    }
  }
  </script>
  
  <style scoped>
  .order {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
  }
  
  .order-total {
    font-weight: bold;
    text-align: right;
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }
  </style>