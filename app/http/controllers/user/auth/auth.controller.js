const createHttpError = require("http-errors");
const Controller = require("../../Controller");
const { authSchema } = require("../../../validators/user/auth.schema");

module.exports = new (class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.json({
        data: result,
        messeage: "done!",
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
})();
