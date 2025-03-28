import axios from 'axios'

const api = axios.create({
  baseURL: '/api-shop',  // Соответствует новому прокси
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000  // Таймаут 10 секунд
})

// Обработчик ошибок
const handleError = (error) => {
  if (error.response) {
    console.error('Server response error:', error.response.status)
  } else if (error.request) {
    console.error('No response received:', error.request)
  } else {
    console.error('Request setup error:', error.message)
  }
  return Promise.reject(error)
}

export default {
  async getProducts() {
    try {
      const response = await api.get('/products')
      return response.data
    } catch (error) {
      handleError(error)
      throw error
    }
  },
}