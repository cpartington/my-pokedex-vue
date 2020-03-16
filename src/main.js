import Vue from 'vue';
import App from './App.vue';
import router from './router';

import pokemon_list from './pokemon-list.js';

Vue.config.productionTip = false

let data = function () {
  return {
    pokemon_list,
    getPokemon() {
      return this.pokemon_list;
    },
    getPokemonById(id) {
      return this.pokemon_list[id - 1];
    },
    updateCaughtStatus(id) {
      this.pokemon_list[id].caught = !this.pokemon_list[id].caught;
    },
    getCaughtEvolution(id) {
      let evolvesToIds = this.getPokemonById(id).evolves_to;
      
      if (typeof evolvesToIds === 'number') {
        if (this.getPokemonById(evolvesToIds).caught)
          return evolvesToIds;
      } else {
        for (const evolveId of evolvesToIds) {
          if (this.getPokemonById(evolveId).caught)
            return id;
        }
      }
    }
  };
};

new Vue({
  router,
  data,
  render: h => h(App),
}).$mount('#app')
