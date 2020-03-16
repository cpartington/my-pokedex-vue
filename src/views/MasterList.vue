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

  <div class="type-options">
    <p>
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.bug }, 'nonselected-type']" src="/assets/types/bug.gif" v-on:click="updateActive('bug')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.dark }, 'nonselected-type']" src="/assets/types/dark.gif" v-on:click="updateActive('dark')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.dragon }, 'nonselected-type']" src="/assets/types/dragon.gif" v-on:click="updateActive('dragon')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.electric }, 'nonselected-type']" src="/assets/types/electric.gif" v-on:click="updateActive('electric')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.fairy }, 'nonselected-type']" src="/assets/types/fairy.gif" v-on:click="updateActive('fairy')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.fighting }, 'nonselected-type']" src="/assets/types/fighting.gif" v-on:click="updateActive('fighting')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.fire }, 'nonselected-type']" src="/assets/types/fire.gif" v-on:click="updateActive('fire')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.flying }, 'nonselected-type']" src="/assets/types/flying.gif" v-on:click="updateActive('flying')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.ghost }, 'nonselected-type']" src="/assets/types/ghost.gif" v-on:click="updateActive('ghost')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.ground }, 'nonselected-type']" src="/assets/types/ground.gif" v-on:click="updateActive('ground')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.ice }, 'nonselected-type']" src="/assets/types/ice.gif" v-on:click="updateActive('ice')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.normal }, 'nonselected-type']" src="/assets/types/normal.gif" v-on:click="updateActive('normal')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.poison }, 'nonselected-type']" src="/assets/types/poison.gif" v-on:click="updateActive('poison')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.psychic }, 'nonselected-type']" src="/assets/types/psychic.gif" v-on:click="updateActive('psychic')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.rock }, 'nonselected-type']" src="/assets/types/rock.gif" v-on:click="updateActive('rock')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.steel }, 'nonselected-type']" src="/assets/types/steel.gif" v-on:click="updateActive('steel')" />
      <img class="pokémon-type-img" :class="[{ 'selected-type': activeTypes.water }, 'nonselected-type']" src="/assets/types/water.gif" v-on:click="updateActive('water')" />
    </p>
  </div>

  <div class="search">
    <i class="material-icons">search</i>
    <input type="text" placeholder="Search for a pokémon..." v-model="searchText" />
  </div>

  <div v-for="(pokémon, index) in searchedPokemon" :key="pokémon.ss_id">
    <div class="card">
      <div class="card-content">
        <div class="card-header">
          <p class="card-number">#{{ pokémon.ss_id.toString().padStart(3, '0') }}</p>
          <p class="card-title">{{ pokémon.name }}</p>
          <p class="pokémon-type-container">
            <img class="pokémon-type-img" :src="`/assets/types/${pokémon.type[0]}.gif`" />
            <img
              class="pokémon-type-img"
              v-if="pokémon.type.length > 1"
              :src="`/assets/types/${pokémon.type[1]}.gif`"
            />
          </p>
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
      filter: "all",
      searchText: "",
      activeTypes: {
        bug: false,
        dark: false,
        dragon: false,
        electric: false,
        fairy: false,
        fighting: false,
        fire: false,
        flying: false,
        ghost: false,
        grass: false,
        ground: false,
        ice: false,
        normal: false,
        poison: false,
        psychic: false,
        rock: false,
        steel: false,
        water: false
      }
    };
  },
  pokemonList: {},
  computed: {
    pokemonCaught() {
      if (this.filter === "caught")
        return this.$root.$data.getPokemon().filter(pokémon => {
          return pokémon.caught;
        });
      else if (this.filter === "uncaught")
        return this.$root.$data.getPokemon().filter(pokémon => {
          return !pokémon.caught;
        });
      else return this.$root.$data.getPokemon();
    },
    pokemonTypes() {
      let activeTypes = Object.keys(this.activeTypes).filter((key) => this.activeTypes[key]);
      if (activeTypes.length > 0) {
        return this.pokemonCaught.filter(pokémon => {
          // return pokémon.type.every(item => activeTypes.includes(item));
          return activeTypes.every(item => pokémon.type.includes(item));
        });
      } else {
        return this.pokemonCaught;
      }
    },
    searchedPokemon() {
      return this.pokemonTypes.filter(
        pokémon => pokémon.name.toLowerCase().search(this.searchText) >= 0
      );
    }
  },
  methods: {
    updateCaught(id) {
      this.$root.$data.updateCaughtStatus(id);
    },
    updateFilter(newFilter) {
      this.filter = newFilter;
    },
    updateActive(type) {
      this.activeTypes[type] = !this.activeTypes[type];
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

.search {
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  margin-bottom: 0.75em;
}

.search i {
  margin-right: 7px;
}

.search input {
  font-size: 1.2em;
  height: 40px;
  flex: 1;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: none !important;
  padding-left: 10px;
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

.pokémon-type-container {
  margin-top: 5px;
}

.pokémon-type-img {
  height: 15px;
  margin-right: 5px;
}

.nonselected-type {
  padding: 3px;
}

.selected-type {
  padding: 1px;
  border: 2px solid #858585;
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
