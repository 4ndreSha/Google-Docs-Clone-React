const { Schema, model } = require("mongoose");

const User = new Schema({
  _id: String,
  username: String,
  password: String,
  documents: Object,
});

module.exports = model("User", User);
