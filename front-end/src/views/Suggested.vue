<template>
<div class="suggested">
  <h1 class="page-title">Suggested Pokémon</h1>

  <h2>Obtain by Evolving</h2>
  <div class="card-pair-container">
    <div v-for="pair in evolvePokemon" :key="pair.canCatch.ss_id">
      <div class="card-pair">
        <div class="card">
          <img :src="pair.alreadyCaught.img_src" />
          <p>{{ pair.alreadyCaught.name }}</p>
        </div>
        <i class="material-icons arrow">double_arrow</i>
        <div class="card">
          <img :src="pair.canCatch.img_src" />
          <p>{{ pair.canCatch.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <h2>Obtain by Breeding</h2>
  <div class="card-pair-container">
    <div v-for="pair in breedPokemon" :key="pair.canCatch.ss_id">
      <div class="card-pair">
        <div class="card">
          <img :src="pair.alreadyCaught.img_src" />
          <p>{{ pair.alreadyCaught.name }}</p>
        </div>
        <i class="material-icons arrow">double_arrow</i>
        <div class="card">
          <img :src="pair.canCatch.img_src" />
          <p>{{ pair.canCatch.name }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "suggested",
  data: function() {
    return {
      pokemonList: [],
      caughtStatus: []
    };
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
      this.$router.push(this.$route.query.redirect || "/");
    }
    this.getPokemon();
    this.getCaughtStatus();
  },
  computed: {
    evolvePokemon() {
      return this.pokemonList
        .filter(pokemon => {
          return (
            !this.caughtStatus[pokemon.ss_id] &&
            pokemon.evolves_from != null &&
            this.caughtStatus[pokemon.evolves_from]
          );
        })
        .map(pokemon => {
          return {
            alreadyCaught: this.pokemonList[pokemon.evolves_from],
            canCatch: pokemon
          };
        });
    },
    breedPokemon() {
      return this.pokemonList
        .filter(pokemon => {
          return (
            !this.caughtStatus[pokemon.ss_id] &&
            pokemon.evolves_to != null &&
            this.getCaughtEvolution(pokemon) != null
          );
        })
        .map(pokemon => {
          let existingId = this.getCaughtEvolution(pokemon);
          return {
            alreadyCaught: this.pokemonList[existingId],
            canCatch: pokemon
          };
        });
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
    getCaughtEvolution(pokemon) {
      for (const evolveId of pokemon.evolves_to) {
        if (this.caughtStatus[evolveId]) return evolveId;
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 1.25em;
  margin-bottom: 1em;
  font-style: italic;
  font-weight: 600;
  text-align: center;
}

.suggested {
  max-width: 900px;
  margin: auto;
  margin-bottom: 75px;
}

.card-pair-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-pair {
  display: flex;
  align-items: center;
}

.card {
  text-align: center;
  font-size: 1.2em;
}

.card img {
  height: 140px;
}

.arrow {
  font-size: 2.5em;
  color: #8d8d8d;
  margin-left: 0.25em;
  margin-right: 0.25em;
}
</style>