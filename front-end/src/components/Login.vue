<template>
<div class="login">
  <div class="card">
    <form class="pure-form">
      <legend>Register for an account</legend>
      <input placeholder="Name" v-model="name" />
      <br />
      <input placeholder="Username" v-model="username" />
      <br />
      <input type="password" placeholder="Password" v-model="password" />
      <br />
      <button type="submit" class="pure-button pure-button primary" @click.prevent="register">Register</button>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
  <div class="card">
    <form class="pure-form">
      <legend>Login</legend>
      <input placeholder="Username" v-model="usernameLogin" />
      <br />
      <input type="password" placeholder="Password" v-model="passwordLogin" />
      <br />
      <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: ""
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (!this.name || !this.username || !this.password)
        return;
      try {
        let response = await axios.post("/api/users", {
          name: this.name,
          username: this.username,
          password: this.password
        });
        this.$root.$data.user = response.data.user;
        await axios.post("/api/pokedex", {
          user: this.$root.$data.user
        });
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = "";
      this.errorLogin = "";
      if (!this.usernameLogin || !this.passwordLogin) return;
      try {
        let response = await axios.post("/api/users/login", {
          username: this.usernameLogin,
          password: this.passwordLogin
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
}

.card {
  min-width: 350px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card:not(:last-child) {
  margin-right: 50px;
}

legend {
  font-size: 1.25em;
  margin-bottom: 10px;
}

input {
  margin-top: 10px;
  padding: 3px;
}

button {
  margin-top: 20px;
  padding: 5px;
}

.error {
  margin-top: 20px;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>