const Controller = require("../Controller");

module.exports = new (class HomeController extends Controller {
  async index(req, res, next) {
    try {
      return res.status(200).send("index page");
    } catch (error) {
        next(error);
    }
  }
})();
