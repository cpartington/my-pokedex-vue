const pokemon_data = require("./pokemon-list.js");
const reader = require("readline-sync");
const mongoose = require('mongoose');
const users = require("../users.js");
const pokedex = require("../pokedex.js");

const User = users.model;
const Pokedex = pokedex.model;
const pokemon_list = pokemon_data.model;

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/mypokedex', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Get the needed info
let name = "Christie";
let username = "chuffin";
const password = reader.question("Password: ", {
  hideEchoBack: true
});

if (password === "") {
  console.log("You need to enter a password.");
  process.exit();
}

// Check that the user doesn't exist yet
User.findOne({
  username: username
}).then((user) => {
  if (user) {
    console.log(username, "already exists.");
    process.exit();
  }
});

async function createUser() {
  try {
    // Create the user
    let user = new User({
      name: name,
      username: username,
      password: password
    });

    // Save the user
    await user.save();

    // Build the pokédex 
    newPokedex = Pokedex({
      user: user,
      caught: new Array(400).fill(false)
    });
    for (let i = 0; i < pokemon_list.length; i++) {
      newPokedex.caught[i] = pokemon_list[i].caught;
    }

    // Save the pokedex
    await newPokedex.save();
    console.log("User successfully created.")
    process.exit();
  } catch (error) {
    console.log(error);
  };
}

createUser();