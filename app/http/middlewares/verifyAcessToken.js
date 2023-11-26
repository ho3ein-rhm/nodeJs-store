const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { SECRET_KEY } = require("../../utils/constants");
const { userModel } = require("../../models/user");
const redisClient = require("../../utils/init-redis");

function verifyAcsessToken(req, res, next) {
  const headers = req.headers;
  const tokenschema = headers?.authorization || "";
  if (!tokenschema)
    return next(createError.Unauthorized("وارد حساب  کاربری  خود شوید"));
  const tokenArray = tokenschema.split(" ");
  const token = tokenArray[1];
  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err)
      return next(createError.Unauthorized("مجدد وارد حساب  کاربری  خود شوید"));
    const { mobile } = decode || {};
    const user = await userModel.findOne(
      { phone: mobile },
      { password: 0, otp: 0, discount: 0, bills: 0, _id: 0, __v: 0 }
    );
    if (!user) return next(createError.Unauthorized("خطایی  رخ داده است "));
    req.user = user;
    return next();
  });
}
function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, async (err, decode) => {
      if (err) reject(next(createError.Unauthorized("خطایی  رخ داده است ")));
      const { mobile } = decode || {};
      const user = await userModel.findOne(
        { mobile },
        { password: 0, otp: 0, discount: 0, bills: 0 }
      );
      if (!user) reject(next(createError.Unauthorized("خطایی  رخ داده است ")));
      const refreshToken = await redisClient.get(user.id);
      if (token == refreshToken) return resolve(mobile);
      reject(createError.Unauthorized("ورود مجدد به حساب  کاربری  انجام نشد "));
      resolve(mobile);
    });
  });
}
function checkRole(role) {
  return function (req, res, next) {
    try {
      if (req.user.roles.includes(role)) return next();
      throw createError.Forbidden("شما به محتوا دسترسی ندارید!");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = {
  verifyAcsessToken,
  verifyRefreshToken,
  checkRole,
};
