const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String },
    text: { type: String },
    images: { type: String },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    deslike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  blogModel: mongoose.model("blog", schema),
};
