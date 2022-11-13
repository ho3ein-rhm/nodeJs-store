const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String },
  text: { type: String },
  images: { type: String },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  cumments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  deslike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
  blogSchema: mongoose.model("", schema),
};
