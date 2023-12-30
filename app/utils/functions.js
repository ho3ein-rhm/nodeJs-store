const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
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
ListOfImageFromRequest = (files, fileUploadPath) => {
  if (files.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((e) => e.replace(/\\/g, "/"));
  } else {
    return [];
  }
};

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function setFeatures(body) {
  const { length, height, width, weight } = body;
  let feature = {};
  if (!isNaN(+length) || !isNaN(+height) || !isNaN(+width) || !isNaN(+weight)) {
    !width ? (feature.width = 0) : (feature.width = +width);
    !weight ? (feature.weight = 0) : (feature.weight = +weight);
    !height ? (feature.height = 0) : (feature.height = +height);
    !length ? (feature.length = 0) : (feature.length = +length);
  }
  return feature;
}
module.exports = {
  randomDigitNumber,
  signAccessToken,
  signRefreshToken,
  deleteFile,
  ListOfImageFromRequest,
  copyObject,
  setFeatures,
};
