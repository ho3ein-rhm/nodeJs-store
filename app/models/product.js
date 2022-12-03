const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    short_desc: { type: String },
    total_desc: { type: String },
    images: { type: [String] },
    tags: { type: [String], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    deslike: { type: [mongoose.Types.ObjectId], default: [] },
    comments: { type: [mongoose.Types.ObjectId], default: [] },
    category: { type: mongoose.Types.ObjectId },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: String, default: 0 },
    count: { type: Number },
    type: { type: String },
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId },
    feture: {
      type: Object,
      default: {
        length: "",
        height: "",
        witdth: "",
        weigth: "",
        color: "",
        madein: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  productModel: mongoose.model("product", schema),
};
