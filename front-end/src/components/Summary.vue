<template>
<div class="summary">
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
</template>

<script>
import axios from "axios";

export default {
  name: "Summary",
  data() {
    return {
      pokemonList: [],
      caughtStatus: []
    };
  },
  created() {
    this.getPokemon();
    this.getCaughtStatus();
  },
  computed: {
    caughtPokemon() {
      return this.caughtStatus.filter(pokemon => pokemon).length;
    },
    evolvedPokemon() {
      // supposedly 26; UI says 30
      return this.pokemonList
        .filter(pokemon => 
          !this.caughtStatus[pokemon.ss_id] && pokemon.evolves_from != null && this.caughtStatus[pokemon.evolves_from]
        ).length;
    },
    breededPokemon() {
      // supposedly 30; UI says 17
      return this.pokemonList
        .filter(pokemon =>
          !this.caughtStatus[pokemon.ss_id] && pokemon.evolves_to != null && this.caughtEvolutionExists(pokemon)
        ).length;
    }
  },
  methods: {
    async getPokemon() {
      try {
        let response = await axios.get("/api/pokemon");
        this.pokemonList = response.data.pokemon;
      } catch (error) {
        console.error(error);
      }
    },
    async getCaughtStatus() {
      try {
        let response = await axios.get("/api/pokedex");
        this.caughtStatus = response.data.pokedex;
      } catch (error) {
        console.error(error);
      }
    },
    caughtEvolutionExists(pokemon) {
      return pokemon.evolves_to.filter(evolveId => this.caughtStatus[evolveId]).length > 0;
    }
  }
}
</script>

<style scoped>
.summary {
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