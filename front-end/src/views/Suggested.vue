<template>
  <div class="suggested">
    <h1 class="page-title">Suggested Pokémon</h1>

    <h2>Obtain by Evolving</h2>
    <div class="card-pair-container">
      <div v-for="pair in evolvePokemon" :key=pair.canCatch.ss_id>
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
      <div v-for="pair in breedPokemon" :key=pair.canCatch.ss_id>
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
export default {
  name: "suggested",
  computed: {
    evolvePokemon() {
      return this.$root.$data.getPokemon()
        .filter(pokémon => {
          return pokémon.caught === false && pokémon.evolves_from != null && this.$root.$data.getPokemonById(pokémon.evolves_from).caught === true;
        }).map(pokémon => {
          return {
            "alreadyCaught": this.$root.$data.getPokemonById(pokémon.evolves_from),
            "canCatch": pokémon 
          }
        });
    },
    breedPokemon() {
      return this.$root.$data.getPokemon()
        .filter(pokémon => {
          return pokémon.caught === false && pokémon.evolves_to != null && this.$root.$data.getCaughtEvolution(pokémon.ss_id) != null;
        }).map(pokémon => {
          let existingId = this.$root.$data.getCaughtEvolution(pokémon.ss_id);
          return {
            "alreadyCaught": this.$root.$data.getPokemonById(existingId),
            "canCatch": pokémon 
          }
        });
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