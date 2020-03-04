import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  data: data,
  render: h => h(App),
}).$mount('#app')

function data() {
  return {
    pokemon_list: [{
        "name": "Wooloo",
        "ss_id": 34,
        "id": 831,
        "galarian": true,
        "caught": true
      },
      {
        "name": "Yamper",
        "ss_id": 46,
        "id": 835,
        "galarian": true,
        "caught": true
      },
      {
        "name": "Oddish",
        "ss_id": 55,
        "id": 43,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Vulpix",
        "ss_id": 68,
        "id": 37,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Munna",
        "ss_id": 90,
        "id": 517,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Natu",
        "ss_id": 92,
        "id": 177,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Wooper",
        "ss_id": 100,
        "id": 194,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Cherubi",
        "ss_id": 128,
        "id": 420,
        "galarian": false,
        "caught": false
      },
      {
        "name": "Pyukumuku",
        "ss_id": 156,
        "id": 771,
        "galarian": false,
        "caught": false
      },
      {
        "name": "Pumpkaboo",
        "ss_id": 191,
        "id": 710,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Eevee",
        "ss_id": 196,
        "id": 133,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Sylveon",
        "ss_id": 204,
        "id": 700,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Gastrodon",
        "ss_id": 231,
        "id": 423,
        "galarian": false,
        "caught": true
      },
      {
        "name": "Hattrem",
        "ss_id": 242,
        "id": 857,
        "galarian": true,
        "caught": true
      },
      {
        "name": "Ponyta",
        "ss_id": 333,
        "id": 77,
        "galarian": true,
        "caught": true
      },
      {
        "name": "Snom",
        "ss_id": 349,
        "id": 872,
        "galarian": true,
        "caught": true
      },
      {
        "name": "Larvitar",
        "ss_id": 383,
        "id": 246,
        "galarian": false,
        "caught": false
      },
      {
        "name": "Goomy",
        "ss_id": 389,
        "id": 704,
        "galarian": false,
        "caught": false
      },
      {
        "name": "Dreepy",
        "ss_id": 395,
        "id": 885,
        "galarian": true,
        "caught": true
      }
    ],
    getPokemon() {
      return this.pokemon_list;
    }
  }
}