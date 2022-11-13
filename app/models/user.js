const mongoose = require("mongoose");

const schema = new mongoose.Schema({});

module.exports = {
  userSchema: mongoose.model("", schema),
};
