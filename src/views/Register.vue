<template>
    <div class="auth-form">
      <h2>Регистрация</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>ФИО</label>
          <input v-model="fio" required>
          <div v-if="errors.fio" class="error-message">{{ errors.fio }}</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required>
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Зарегистрироваться' }}
        </button>
        <router-link to="/login" class="auth-link">Уже есть аккаунт? Войти</router-link>
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
      const fio = ref('')
      const email = ref('')
      const password = ref('')
      const errors = ref({})
      const loading = ref(false)
  
      const submit = async () => {
        loading.value = true
        errors.value = {}
        
        const { success, errors: apiErrors } = await store.dispatch('register', {
          name: fio.value,
          email: email.value,
          password: password.value
        })
        
        if (apiErrors) {
          errors.value = apiErrors
        } else if (success) {
          router.push('/login')
        }
        
        loading.value = false
      }
  
      return { fio, email, password, errors, loading, submit }
    }
  }
  </script>
  
  <style scoped>
  .error-message {
    color: #ff4444;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  </style>