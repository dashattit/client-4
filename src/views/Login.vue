<template>
    <div class="auth-form">
      <h2>Вход</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const store = useStore()
      const router = useRouter()
      const email = ref('')
      const password = ref('')
  
      const submit = async () => {
        const success = await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        if (success) {
          router.push('/')
        }
      }
  
      return { email, password, submit }
    }
  }
  </script>