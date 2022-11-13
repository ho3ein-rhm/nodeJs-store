const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: "",
      expires: new Date() + 120,
    },
  },
  bills : {
    type: [] , default: []
  },
  discount: {type: Number , default: 0},
  birthday: {type: String},
  roles: {type: [String] , default: ["USER"]}
});

module.exports = {
  userModel: mongoose.model("user", schema),
};
