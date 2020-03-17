<template>
<div class="home">
  <h1 class="page-title">My Pokédex</h1>
  <div class="content">
    <div class="card">
      <h2>Caught pokémon</h2>
      <p class="number">{{ caughtPokemon }}</p>
      <router-link to="/master-list">View master list</router-link>
    </div>
    
    <div class="card">
      <h2>Suggestions</h2>
      <p class="number">{{ evolvedPokemon + breededPokemon }}</p>
      <router-link to="/suggested">View suggestions</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "home",
  computed: {
    caughtPokemon() {
      return this.$root.$data.getPokemon().filter(pokémon => pokémon.caught).length
    },
    evolvedPokemon() {
      return this.$root.$data.getPokemon()
        .filter(pokémon => 
          pokémon.caught === false && pokémon.evolves_from != null && this.$root.$data.getPokemonById(pokémon.evolves_from).caught === true
        ).length
    },
    breededPokemon() {
      return this.$root.$data.getPokemon()
        .filter(pokémon =>
          pokémon.caught === false && pokémon.evolves_to != null && this.$root.$data.getCaughtEvolution(pokémon.ss_id) != null
        ).length
    }
  }
};
</script>

<style scoped>
.page-title {
  margin-top: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: lightsteelblue;
  font-size: 3.5em;
}

.content {
  max-width: 900px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 75px;
  display: flex;
  justify-content: center;
}

.card {
  width: 300px;
  text-align: center;
}

.card:not(:last-child) {
  margin-right: 50px;
}

.card h2 {
  font-size: 2em;
}

.card a {
  font-size: 1.3em;
}

.number {
  font-family: 'Lato', sans-serif;
  font-size: 100px;
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
