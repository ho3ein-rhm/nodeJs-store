const createHttpError = require("http-errors");
const Controller = require("../../Controller");
const { authSchema } = require("../../../validators/user/auth.schema");
const { randomDigitNumber } = require("../../../../utils/functions");

module.exports = new (class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      const { phone } = req.body;
      let otp = {
        code: randomDigitNumber(),
        expires: new Date().getTime() + 120000,
      };
      const resultUser = await this.saveUser(phone, otp);
      console.log(resultUser);
      if (!resultUser) return next(createHttpError.Unauthorized("ورود انجام نشد!"));
      return res.json({
        data: resultUser,
        messeage: "کد اعتبار سنجی برای شما ارسال شد",
        code: otp.code,
        statusCode: 200,
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
  async saveUser(phone, otp) {
    const resultCheckUser = await this.checkUser({ phone });
    if (resultCheckUser) {
      return this.updateUser(phone, otp);
    } else {
      return await this.models.userModel.create({
        phone,
        otp,
      });
    }
  }
  async checkUser(phone) {
    const user = await this.models.userModel.findOne(phone);
    return !!user;
  }
  async updateUser(phone, object = {}) {
    Object.keys(object).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(object[key]))
        delete object[key];
    });
    const updateResult = await this.models.userModel.updateOne(
      { phone },
      { $set: object },
      {
        modifiedCount: true,
      }
    );
    return !!updateResult.modifiedCount;
  }
})();
