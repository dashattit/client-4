<template>
  <div class="app">
    <header>
      <h1>Просто купить</h1>
      <nav>
        <router-link to="/">Каталог</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Вход</router-link>
        <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
        <router-link v-if="isAuthenticated" to="/orders">Заказы</router-link>
        <router-link v-if="isAuthenticated" to="/cart">Корзина ({{ cartItemCount }})</router-link>
        <button v-if="isAuthenticated" @click="logout">Выйти</button>
      </nav>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Notification 
      v-for="(notification, index) in notifications"
      :key="index"
      :type="notification.type"
      :message="notification.message"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Notification from '@/components/Notification.vue'

export default {
  components: { Notification },
  setup() {
    const store = useStore()

    return {
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      cartItemCount: computed(() => store.getters.cartItemCount),
      notifications: computed(() => store.state.notifications),
      logout: () => store.dispatch('logout')
    }
  }
}
</script>

<style>
/* Стили компонента */
</style>