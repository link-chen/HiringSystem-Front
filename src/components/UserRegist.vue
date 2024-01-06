<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Regist</h2>
      <form @submit.prevent="Regist" class="login-form">
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input type="text" id="email" v-model="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Regist</button>
        <router-link to="/">返回登录页面</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    Regist() {
      axios.post("http://localhost:8080/UserService/Regist",{"email":this.email,"password":this.password}).then((Response=>{
        alert("您的账号为："+Response.data.data)
      }))
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.login-form {
  text-align: center; /* 居中链接 */
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

router-link {
  display: inline-block; /* 与按钮在同一行 */
  margin-top: 10px; /* 添加一些间距 */
}
</style>
