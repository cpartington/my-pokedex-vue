<template>
<div class="home">
  <h1>The Master List</h1>
  <div v-for="pokémon in pokemonList" v-bind:key="pokémon.ss_id">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title header-font">{{ pokémon.name }}</div>
        <div class="md-subtitle">#{{ pokémon.ss_id.toString().padStart(3, '0') }}</div>
      </md-card-header>

      <md-card-media>
          <img :src="pokemonImgSource(pokémon.name)" :alt="pokémon.name">
          <!-- <img src="../assets/pokemon/wooloo.png" :alt="pokémon.name"> -->
      </md-card-media>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>
    </md-card>
  </div>
</div>
</template>

<style scoped>
.md-card {
  margin-bottom: 2em;
}

.header-font {
  font-family: 'Spectral', serif;
}
</style>

<script>
export default {
  name: "home",
  data() {
    return {
      pokemonImgSource(name) {
        return `../assets/pokemon/${ name.toLowerCase() }.png`;
      }
    }
  },
  computed: {
    pokemonList() {
      return this.$root.$data.getPokemon();
    }
  }
};
</script>
