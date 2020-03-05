<template>
<div class="home">
  <h1 class="page-title">The Master List</h1>

  <div v-for="(pokémon, index) in pokemonList" :key="pokémon.ss_id">
    <div class="card">    
      
      <div class="card-content">  
        <div class="card-header">
          <p class="card-number">#{{ pokémon.ss_id.toString().padStart(3, '0') }}</p>
          <p class="card-title">{{ pokémon.name }}</p>
        </div>
        <div class="card-text">
          <checkbox :caught="pokémon.caught" v-on:change="updateCaught(index)"></checkbox>
        </div>
      </div>
      
      <div class="card-image">
        <img class="card-image" :src="require(`@/assets/pokemon/${pokémon.name.toLowerCase()}.png`)" :alt="pokémon.name"/>
      </div>
    
    </div>
  </div>
</div>
</template>

<script>
import checkbox from '@/components/Checkbox.vue';

export default {
  name: "home",
  components: {
    checkbox
  },
  pokemonList: {},
  computed: {
    pokemonList() {
      return this.$root.$data.getPokemon();
    }
  },
  methods: {
    updateCaught(id) {
      this.$root.$data.updateCaughtStatus(id);
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 1em;
  padding: 16px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: 4px 4px 5px lightgrey;
  display: flex;
  justify-content: space-between;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-number {
  color: #8d8d8d;
}

.card-title {
  font-family: 'Spectral', serif;
  font-size: 1.5em;
  margin-top: 0.25em;
  font-weight: 600;
}

.card-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}

/* Mobile */
@media only screen and (max-width: 450px) {
  .card-image {
    width: 100px;
  }
}

/* Desktop */
@media only screen and (min-width: 451px) {
  .card-image {
    width: 200px;
  }
}
</style>
