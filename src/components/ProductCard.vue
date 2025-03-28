<template>
  <div class="product-card">
    <div class="image-wrapper">
      <img 
        :src="'http://lifestealer86.ru/' + product.image" 
        :alt="product.name"
        class="product-image"
        loading="lazy"
      >
    </div>
    <div class="content">
      <h3 class="title">{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>
      <div class="footer">
        <span class="price">{{ product.price }} ₽</span>
        <button 
          v-if="isAuthenticated" 
          @click="$emit('add-to-cart', product)"
          class="cart-btn"
        >
          В корзину
        </button>
        <router-link v-else to="/login" class="login-btn">
          Войти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 200px; /* Фиксированная ширина карточки */
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.image-wrapper {
  height: 120px; /* Уменьшенная высота изображения */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  padding: 10px;
}

.content {
  padding: 12px;
}

.title {
  font-size: 14px;
  margin: 0 0 6px 0;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  font-size: 12px;
  color: #666;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 32px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 14px;
}

.cart-btn, .login-btn {
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.cart-btn {
  background: #42b983;
  color: white;
}

.cart-btn:hover {
  background: #3aa876;
}

.login-btn {
  background: #f0f0f0;
  color: #555;
  text-decoration: none;
}

.login-btn:hover {
  background: #e0e0e0;
}

@media (max-width: 480px) {
  .product-card {
    width: 160px;
  }
  
  .image-wrapper {
    height: 100px;
  }
  
  .title {
    font-size: 13px;
  }
}
</style>