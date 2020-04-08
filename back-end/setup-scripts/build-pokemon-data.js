const pokemon_data = require("./pokemon-list.js");
const mongoose = require('mongoose');
const pokemon = require("../pokemon.js");

const Pokemon = pokemon.model;
const pokemon_list = pokemon_data.model;

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/mypokedex', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

async function createPokemon(p) {
  try {
    let newPokemon = new Pokemon({
      ss_id: p.ss_id,
      gen_id: p.gen_id,
      img_src: '/assets/pokemon/' + p.name.toLowerCase() + '.png',
      name: p.name,
      type: p.type,
      evolves_from: p.evolves_from,
      evolves_to: p.evolves_to
    });
    await newPokemon.save();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

pokemon_list.forEach((p) => {
  createPokemon(p);
});

process.exit();