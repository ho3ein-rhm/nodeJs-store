const mongoose = require("mongoose");

const schema = new mongoose.Schema({});

module.exports = {
  productSchema: mongoose.model("", schema),
};
