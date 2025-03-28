<template>
    <div class="auth-form">
      <h2>Вход</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
          <div v-if="error" class="error-message">{{ error }}</div>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>
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
      const error = ref('')
      const loading = ref(false)
  
      const submit = async () => {
        loading.value = true
        error.value = ''
        
        const success = await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        
        if (success) {
          router.push('/')
        } else {
          error.value = 'Неверные учетные данные'
        }
        
        loading.value = false
      }
  
      return { email, password, error, loading, submit }
    }
  }
  </script>