<template>
    <div class="notification" :class="type">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      },
      message: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: white;
    animation: slideIn 0.3s ease-out;
  }
  
  .notification.success {
    background-color: #4CAF50;
  }
  
  .notification.error {
    background-color: #F44336;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  </style>