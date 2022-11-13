const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {type: String},
  text: {type: String},
  image: {type: String},
  type: {type: String, default: 'base'}
});

module.exports = {
  sliderModel: mongoose.model("slider", schema),
};
