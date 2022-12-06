const createHttpError = require("http-errors");
const Controller = require("../../Controller");
const {
  authSchema,
  checkCodeSchema,
} = require("../../../validators/user/auth.schema");
const { randomDigitNumber, signAccessToken } = require("../../../../utils/functions");

module.exports = new (class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      const { phone } = req.body;
      let otp = {
        code: randomDigitNumber(),
        expires: new Date().getTime() + 120000,
      };
      const resultUser = await this.saveUser(phone, otp);
      if (!resultUser)
         throw createHttpError.Unauthorized("ورود انجام نشد!")
      return res.json({
        data: resultUser,
        messeage: "کد اعتبار سنجی برای شما ارسال شد",
        code: otp.code,
        statusCode: 200,
      });
    } catch (error) {
      next(error);
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
  async updateUser(phone, otp = {}) {
    Object.keys(otp).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(otp[key]))
        delete otp[key];
    });
    const updateResult = await this.models.userModel.updateOne(
      { phone },
      { otp },
      {
        modifiedCount: true,
      }
    );
    return !!updateResult.modifiedCount;
  }
  async checkCode(req, res, next) {
    try {
      await checkCodeSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const findUser = await this.models.userModel.findOne({
        phone,
      });
      if (!findUser)
         throw createHttpError.Unauthorized("کاربری با این مشخصات یافت نشد!");
      if (findUser.otp.code == code) {
        if (+findUser.otp.expires < Date.now()) {
          throw createHttpError.Unauthorized("کد شما منقضی شده است");
        }
        const accessToken = await signAccessToken(findUser.id);
        res.json({
          data: {
            statusCode: 200,
            accessToken,
            message: "Welcome!",
          },
        });
      } else {
        res.json({
          data: {
            statusCode: 401,
            message: "phone number or code is wrong!",
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
})();
