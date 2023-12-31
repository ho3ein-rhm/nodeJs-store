const autoBind = require("auto-bind");
const { userModel } = require("../../models/user");
const { categoryModel } = require("../../models/category");
const { blogModel } = require("../../models/blog");
const { commentModel } = require("../../models/comments");
const { ProductSchema } = require("../../models/product");
const { CourseModel } = require("../../models/courses");
module.exports = class Controller {
  constructor() {
    autoBind(this);
    this.models = {
      userModel,
      categoryModel,
      blogModel,
      commentModel,
      ProductSchema,
      CourseModel,
    };
  }
};
