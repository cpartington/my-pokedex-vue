<template>
  <div id="app">
    <div class="header-bar">
      <div class="header-content">
        <h1>My Pokédex</h1>
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p>
        <a href="https://github.com/cpartington/my-pokedex" target="blank">Github Repository</a>
      </p>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
  padding: 0px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  color: #414141;
}

h1,
h2,
h3 {
  font-family: Spectral, serif;
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
  padding: 10px 100px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 850px;
  margin: 0 auto;
}

.header-content h1 {
  font-size: 2.5em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #414141;
}

#nav a.router-link-exact-active {
  color: #d19192;
}

#nav a:not(:last-child) {
  margin-right: 1em;
}

.content {
  margin: 10px;
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
  font-size: 0.8em;
  margin: 0;
}

/* Mobile */
@media only screen and (max-width: 450px) {
}

/* Desktop */
@media only screen and (min-width: 451px) {
  .content {
    max-width: 850px;
    margin: auto;
    margin-bottom: 75px;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
