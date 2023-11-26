const Controller = require("../Controller");

class productController extends Controller {
  addproduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  productController: new productController(),
};
