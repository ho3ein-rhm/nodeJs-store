const mongoose = require("mongoose");

const schema = new mongoose.Schema({});

module.exports = {
  paymentShema: mongoose.model("", schema),
};
