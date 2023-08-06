const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
const user = require("../models/user");
const { SECRET_KEY } = require("./constants");

randomDigitNumber = () =>{
    return Math.floor((Math.random()* 90000) + 10000);
}

signAccessToken = (userID) =>{
    return new Promise(async(resolve,reject) =>{
        const user = await userModel.findById(userID);
        const payload = {
            mobile: user.phone,
        }
        const options = {
            expiresIn : '1h'
        }
        jwt.sign(payload, SECRET_KEY , options , (err , token) =>{
            if(err) reject(createHttpError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })
}

signRefreshToken = (userID) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userID);
    const payload = {
        mobile: user.phone,
    };
    const options = {
      expiresIn: "1y",
    };
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
};

module.exports = {
  randomDigitNumber,
  signAccessToken,
  signRefreshToken,
};