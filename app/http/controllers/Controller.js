const autoBind = require("auto-bind");
const { userModel } = require("../../models/user");
const { categoryModel } = require("../../models/category");

module.exports = class Controller {
  constructor() {
    autoBind(this);
    this.models = { userModel, categoryModel };
  }
};
