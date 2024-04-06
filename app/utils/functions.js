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
function getTime(secends) {
  let total = Math.round(secends) / 60;
  let [minutes, percent] = String(total).split(".");
  let secend = Math.round((percent * 60) / 100)
    .toString()
    .substring(0, 2);
  let houre = 0;
  if (minutes > 60) {
    total = minutes / 60;
    let [h1, m2] = String(total).split(".");
    houre = h1;
    minutes = Math.round((m2 * 60) / 100)
      .toString()
      .substring(0, 2);
  }
  return (houre+ ":" + minutes + ":" + secend)
}
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}
module.exports = {
  randomDigitNumber,
  signAccessToken,
  signRefreshToken,
  deleteFile,
  ListOfImageFromRequest,
  copyObject,
  setFeatures,
  getTime
};
