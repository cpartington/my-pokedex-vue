const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

const validUser = users.valid;

/* Pokémon Schema */

const pokemonSchema = new mongoose.Schema({
  ss_id: Number,
  gen_id: Number,
  img_src: String,
  name: String,
  type: Array,
  evolves_from: Number,
  evolves_to: Array
});

// Create the model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

/* API Endpoints */

// Get list of pokémon 
router.get('/', validUser, async (req, res) => {
  try {
    pokemon = await Pokemon.find().sort({
      ss_id: 1
    });
    return res.send({
      pokemon: pokemon
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get a single pokémon 
router.get('/:id', validUser, async(req, res) => {
  try {
    pokemon = await Pokemon.findOne({
      ss_id: req.params.id
    });
    return res.send({
      pokemon: pokemon
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Pokemon
}