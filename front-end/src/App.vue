<template>
<div id="app">
  <div class="header-bar">
    <div class="header-content">
      <h1 v-if="this.$route.name != 'Home'">My Pokédex</h1>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <span v-show="user">
          <router-link to="/master-list">Master List</router-link> |
          <router-link to="/suggested" v-show="user">Suggested</router-link> |
        </span>
        <router-link to="/about">About</router-link>
        <span v-on:click="logout" v-show="user" id="logout">Logout</span>
      </div>
    </div>
  </div>
  <router-view />
  <div class="footer">
    <p>
      <a href="https://github.com/cpartington/my-pokedex-vue" target="blank">Github Repository</a>
    </p>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
      this.$router.push(this.$route.query.redirect || '/');
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  font-family: "Lato", sans-serif;
}

body {
  font-size: 16px;
  color: #414141;
}

h1,
h2,
h3 {
  font-family: "Spectral", serif;
  font-weight: normal;
}

a {
  color: #d19192;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header-bar {
  background: lightsteelblue;
  padding: 1.25em 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}

.header-content h1 {
  font-style: italic;
  font-weight: 600;
}

.header-content a {
  font-size: 1.1em;
}

#nav {
  margin-left: auto;
}

#nav a {
  font-weight: 500;
  color: #414141;
}

#nav a.router-link-exact-active {
  color: #cf6264;
  /* color: #d19192; */
}

#logout {
  margin-left: 10px;
  background-color: #c79293;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.content {
  margin: 10px;
}

.page-title {
  text-align: center;
  font-size: 2.5em;
  font-weight: 800;
  font-style: italic;
  margin-top: 1.25em;
  margin-bottom: 0.5em;
}

/* Footer */
.footer {
  background-color: lightsteelblue;
  padding: 15px;
  text-align: center;
}

.footer a {
  color: #414141;
}

.footer p {
  font-size: 0.9em;
  font-family: "Spectral", serif;
  margin: 0;
}

/* Base card */
.card {
  margin-bottom: 1em;
  padding: 16px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: 4px 4px 5px lightgrey;
}

/* Mobile */
@media only screen and (max-width: 450px) {
  .header-bar {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Desktop */
@media only screen and (min-width: 451px) {
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
