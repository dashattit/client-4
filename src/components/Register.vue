<template>
    <form class="register-form" @submit.prevent="handleSubmit">
      <h1 class="form-title">Регистрация</h1>
      
      <div class="form-group">
        <label>ФИО (Фамилия Имя Отчество)</label>
        <input 
          type="text" 
          v-model="fullName" 
          placeholder="Иванов Иван Иванович" 
          @blur="validateFullName"
        />
        <span class="error" v-if="errors.fullName">{{ errors.fullName }}</span>
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input 
          type="email" 
          v-model="email" 
          placeholder="example@mail.com" 
          @blur="validateEmail"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label>Пароль</label>
        <input 
          type="password" 
          v-model="password" 
          placeholder="Не менее 6 символов" 
          @blur="validateField('password')"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <button type="submit" class="submit-btn">Зарегистрироваться</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fullName: "",
        email: "",
        password: "",
        errors: {
          fullName: "",
          email: "",
          password: ""
        }
      };
    },
    methods: {
      validateField(field) {
        if (!this[field] || !this[field].trim()) {
          this.errors[field] = "Поле обязательно для заполнения";
          return false;
        }
        this.errors[field] = "";
        return true;
      },
      validateFullName() {
        if (!this.fullName || !this.fullName.trim()) {
          this.errors.fullName = "Поле обязательно для заполнения";
          return false;
        }
        
        // Проверяем, что введены все три части ФИО
        const parts = this.fullName.trim().split(/\s+/);
        if (parts.length < 3) {
          this.errors.fullName = "Введите фамилию, имя и отчество через пробел";
          return false;
        }
        
        this.errors.fullName = "";
        return true;
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
          this.errors.email = "Поле обязательно для заполнения";
          return false;
        }
        if (!emailRegex.test(this.email)) {
          this.errors.email = "Введите корректный email";
          return false;
        }
        this.errors.email = "";
        return true;
      },
      validateForm() {
        const isValidFullName = this.validateFullName();
        const isValidEmail = this.validateEmail();
        const isValidPassword = this.validateField('password');
        
        return isValidFullName && isValidEmail && isValidPassword;
      },
      handleSubmit() {
        if (!this.validateForm()) return;
        
        // Разбиваем ФИО на составляющие
        const [lastName, firstName, ...middleNameParts] = this.fullName.trim().split(/\s+/);
        const middleName = middleNameParts.join(' ');
        
        const userData = {
          fio: `${lastName} ${firstName} ${middleName}`,
          email: this.email,
          password: this.password
        };
        
        this.$store.dispatch("REGISTER_REQUEST", userData)
          .then(() => this.$router.push("/login"))
          .catch((error) => {
            console.error('Ошибка регистрации:', error.message);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    color: #25ebba;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .form-group {
    margin-bottom: 1.2rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #25ebba;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  
  .error {
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #25ebba;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 0.5rem;
  }
  
  .submit-btn:hover {
    background-color: #25ebba;
  }
  
  .submit-btn:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  </style>