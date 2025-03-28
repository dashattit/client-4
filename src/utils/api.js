import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://lifestealer86.ru/api-shop',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  login(credentials) {
    return api.post('/login', credentials)
  },
  register(userData) {
    return api.post('/register', userData)
  },
  getProducts() {
    return api.get('/products')
  }
}