const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: false,
  }
);

module.exports = {
  categoryModel: mongoose.model("category", schema),
};
