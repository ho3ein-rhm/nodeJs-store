const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
    id: false,
    validateBeforeSave: false,
    toJSON: {
      virtuals: true,
    },
  }
);
schema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
  next();
}
schema.pre("find", autoPopulate).pre("findOne", autoPopulate);
module.exports = {
  categoryModel: mongoose.model("category", schema),
};
