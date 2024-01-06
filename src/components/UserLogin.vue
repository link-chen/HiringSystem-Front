<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <label for="usercount">Usercount:</label>
          <input type="text" id="username" v-model="usercount" placeholder="Enter your count" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <div class="router-link-container">
          <label for="isAdmin">Admin:</label>
          <input type="checkbox" id="isAdmin" v-model="isAdmin" />
        </div>
        <button type="submit" @click="login">Login</button>
        <div class="router-link-container">
          <router-link to="/Regist">用户注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usercount: '',
      password: '',
      isAdmin: false,
      nextRoute: ''
    };
  },
  methods: {
    login() {
      if (this.isAdmin === true) {
        axios.post('http://localhost:8080/HRService/HRLogin', { "id": parseInt(this.usercount, 10), password: this.password }).then((Response => {
          if (Response.data.data === "Success") {
            this.handleResponse(this.usercount);
          }
          else {
            alert("账号或密码错误");
          }
        }));
      } else {
        axios.post('http://localhost:8080/UserService/Login', { "id": parseInt(this.usercount, 10), password: this.password }).then((Response => {
          if (Response.data.data === "Success") {
            this.handleResponse(this.usercount);
          }
          else {
            alert("账号或密码错误");
          }
        }));
      }
    },
    handleResponse(id) {
      if (this.isAdmin === true) {
        this.nextRoute = '/HRSpace';
      } else {
        this.nextRoute = '/UserSpace';
      }
      this.$router.push({
        path: this.nextRoute,
        query: {
          data: id
        }
      });
    }
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

.router-link-container {
  text-align: center; /* 居中链接 */
}
</style>
