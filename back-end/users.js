const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

/* User Schema */

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});

// Hook to salt & hash the password
userSchema.pre('save', async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password'))
    return next();

  try {
    // Generate hash and replace plaintext
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Method for checking password validity
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// Custom JSON conversion to remove password
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

// Create the model
const User = mongoose.model('User', userSchema);

/* Middleware */

// Checks that the user is valid
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // Set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist
    return res.status(403).send({
      message: "Not logged in"
    });
  }

  next();
};

/* API Endpoints */

// Create a new user
router.post('/', async (req, res) => {
  // Make sure request is valid
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "Username and password are required"
    });

  try {

    //  Make sure username doesn't already exist
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "Username already exists"
      });

    // Create a new user and save it to the database
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    // Set user session info
    req.session.userID = user._id;
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  // Make sure request is valid
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  Look up user record
    const user = await User.findOne({
      username: req.body.username
    });
    // Return an error if user does not exist
    if (!user)
      return res.status(403).send({
        message: "Invalid username or password"
      });

    // Return same error if password is incorrect
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        message: "Invalid username or password"
      });

    // Set user session info
    req.session.userID = user._id;
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get logged-in user
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Logout
router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: User,
  valid: validUser
};