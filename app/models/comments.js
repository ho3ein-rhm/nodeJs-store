const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "comments" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = {
  CommentSchema: mongoose.model("comments", schema),
};
