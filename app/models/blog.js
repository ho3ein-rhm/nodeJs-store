const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String },
    text: { type: String },
    images: { type: String },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    deslike: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

schema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APLICATION_PORT}/${this.images}`;
});

module.exports = {
  blogModel: mongoose.model("blog", schema),
};
