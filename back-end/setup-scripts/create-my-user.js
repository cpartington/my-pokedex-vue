const pokemon_data = require("./pokemon-list.js");
const reader = require("readline-sync");
const mongoose = require('mongoose');
const users = require("../users.js");

const User = users.model;
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

// Create the user
User.findOne({
  username: username
}).then((user) => {
  if (user) {
    console.log(username, "already exists.");
    process.exit();
  }
}).then(() => {
  // Create the user
  let user = new User({
    name: name,
    username: username,
    password: password
  });

  // Build the pokédex 
  try {
    for (let i = 0; i < pokemon_list.length; i++) {
      user.caught[i] = pokemon_list[i].caught;
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }

  // Save everything
  user.save().then(() => {
    console.log("OK, user", username, "created.");
    process.exit();
  });

}).catch(error => {
  console.log(error);
});