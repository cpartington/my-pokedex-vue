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
    updateCaughtStatus(id) {
      this.pokemon_list[id].caught = !this.pokemon_list[id].caught;
    }
  };
};

new Vue({
  router,
  data,
  render: h => h(App),
}).$mount('#app')
