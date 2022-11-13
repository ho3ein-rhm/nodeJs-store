const mongoose = require("mongoose");

const schema = new mongoose.Schema({});

module.exports = {
  categorySchema: mongoose.model("", schema),
};
