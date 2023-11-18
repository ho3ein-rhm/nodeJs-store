const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
const user = require("../models/user");
const { SECRET_KEY } = require("./constants");
const redisClient = require("./init-redis");
const path = require("path");
const fs = require("fs");

randomDigitNumber = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};

signAccessToken = (userID) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userID);
    const payload = {
      mobile: user.phone,
    };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
};

signRefreshToken = (userID) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userID);
    const payload = {
      mobile: user.phone,
    };
    const options = {
      expiresIn: "1y",
    };
    jwt.sign(payload, SECRET_KEY, options, async (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      await redisClient.SETEX(userID, 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
};
deleteFile = (fileAddress) => {
  if (fileAddress) {
    filePath = path.join(__dirname, "..", "..", "public", fileAddress);
    fs.unlinkSync(filePath);
  }
};
module.exports = {
  randomDigitNumber,
  signAccessToken,
  signRefreshToken,
  deleteFile,
};
