const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { SECRET_KEY } = require("../../utils/constants");
const { userModel } = require("../../models/user");

function verifyAcsessToken(req, res, next) {
  const headers = req.headers;
  const token = headers?.accesstoken || "";
  if (!token)
    return next(createError.Unauthorized("وارد حساب  کاربری  خود شوید"));
  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err) return next(createError.Unauthorized("خطایی  رخ داده است "));
    const { mobile } = decode || {};
    const user = await userModel.findOne(
      { mobile },
      { password: 0, otp: 0, discount: 0, bills: 0, _id: 0 }
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
        { password: 0, otp: 0, discount: 0, bills: 0, _id: 0 }
      );
      if (!user) reject(next(createError.Unauthorized("خطایی  رخ داده است ")));
      resolve(mobile);
    });
  });
}

module.exports = {
  verifyAcsessToken,
  verifyRefreshToken,
};
