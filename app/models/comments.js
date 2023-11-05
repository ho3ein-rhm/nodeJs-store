const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = {
  commentModel: mongoose.model("comments", schema),
};
