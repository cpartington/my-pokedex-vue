const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

const User = users.model;
const validUser = users.valid;

/* Pokédex Schema */

const pokedexSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  caught: Array
});

// Create the model
const Pokedex = mongoose.model('Pokedex', pokedexSchema);

/* API Endpoints */

// Get pokédex
router.get('/', validUser, async (req, res) => {
  try {
    pokedex = await Pokedex.findOne({
      user: req.user
    });
    return res.send({
      pokedex: pokedex.caught
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Create pokédex 
router.post('/', validUser, async (req, res) => {
  const pokedex = new Pokedex({
    user: req.user,
    caught: new Array(400).fill(false)
  });
  try {
    await pokedex.save();
    return res.send({
      pokedex: pokedex.caught
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Update pokédex
router.put('/:id', validUser, async (req, res) => {
  try {
    pokedex = await Pokedex.findOne({
      user: req.user
    });
    let ss_id = req.params.id;
    pokedex.caught.set(ss_id, !pokedex.caught[ss_id]);
    await pokedex.save();
    return res.send({
      pokedex: pokedex.caught
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Pokedex
}