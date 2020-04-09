const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/mypokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    }
}));

// Import the users module and set up its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// Import the pokémon module and set up its API path
const pokemon = require("./pokemon.js");
app.use("/api/pokemon", pokemon.routes);

// Import the pokédex module and set up its API path
const pokedex = require("./pokedex.js");
app.use("/api/pokedex", pokemon.routes);

app.listen(3000, () => console.log('Server listening on port 3000!'));