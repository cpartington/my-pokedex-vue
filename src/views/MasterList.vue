<template>
<div class="master-list">
  <h1 class="page-title">The Master List</h1>

  <div class="filter-options">
    <p>Show:</p>
    <radioButton class="button" name="All" :checked="true" v-on:change="updateFilter('all')"></radioButton>
    <radioButton
      class="button"
      name="Caught"
      :checked="false"
      v-on:change="updateFilter('caught')"
    ></radioButton>
    <radioButton
      class="button"
      name="Uncaught"
      :checked="false"
      v-on:change="updateFilter('uncaught')"
    ></radioButton>
  </div>

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
        <img class="card-image" :src="pokémon.img_src" :alt="pokémon.name" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import checkbox from "@/components/Checkbox.vue";
import radioButton from "@/components/RadioButton.vue";

export default {
  name: "master-list",
  components: {
    checkbox,
    radioButton
  },
  data: function() {
    return {
      filter: "all"
    };
  },
  pokemonList: {},
  computed: {
    pokemonList() {
      if (this.filter === "caught")
        return this.$root.$data.getPokemon().filter(pokémon => {
          return pokémon.caught;
        });
      else if (this.filter === "uncaught")
        return this.$root.$data.getPokemon().filter(pokémon => {
          return !pokémon.caught;
        });
      else return this.$root.$data.getPokemon();
    }
  },
  methods: {
    updateCaught(id) {
      this.$root.$data.updateCaughtStatus(id);
    },
    updateFilter(newFilter) {
      this.filter = newFilter;
    }
  }
};
</script>

<style scoped>
.master-list {
  max-width: 900px;
  margin: auto;
  margin-bottom: 75px;
}

.filter-options {
  display: flex;
  font-size: 1.1em;
}

.filter-options p,
.filter-options .button {
  margin-right: 1em;
}

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
  font-size: 1.1em;
}

.card-title {
  font-family: "Spectral", serif;
  font-size: 1.75em;
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
