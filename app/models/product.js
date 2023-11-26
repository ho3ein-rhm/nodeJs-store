const mongoose = require("mongoose");
const { CommentSchema } = require("./comments");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true }, //virtual - physici
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    features: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        madein: "",
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = {
  ProductSchema: mongoose.model("product", schema),
};
