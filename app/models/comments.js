const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "comments" },
    show: { type: Boolean, default: false },
    openToComment: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: true },
    versionKey: false,
  }
);

module.exports = {
  CommentSchema: mongoose.model("comments", schema),
};
