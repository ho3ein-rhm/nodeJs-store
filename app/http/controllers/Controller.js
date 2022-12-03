const autoBind = require("auto-bind");
const { userModel } = require("../../models/user");
module.exports = class Controller {
  constructor() {
    autoBind(this);
    this.models = { userModel };
  }
};
