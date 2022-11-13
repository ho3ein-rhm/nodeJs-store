const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {type: String, required: true}
});

module.exports = {
  categoryModel: mongoose.model("category", schema),
};
