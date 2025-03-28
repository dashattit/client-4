<template>
    <div class="auth-form">
      <h2>Регистрация</h2>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Имя</label>
          <input v-model="name" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required>
        </div>
        <button type="submit">Зарегистрироваться</button>
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
      const name = ref('')
      const email = ref('')
      const password = ref('')
  
      const submit = async () => {
        const success = await store.dispatch('register', {
          name: name.value,
          email: email.value,
          password: password.value
        })
        if (success) {
          router.push('/login')
        }
      }
  
      return { name, email, password, submit }
    }
  }
  </script>
  
  <style scoped>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .auth-link {
    display: block;
    margin-top: 1rem;
    text-align: center;
    color: #42b983;
  }
  </style>