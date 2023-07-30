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
            //userId : user.id
        }
        const secret = SECRET_KEY
        const options = {
            expiresIn : '1h'
        }
        jwt.sign(payload, secret , options , (err , token) =>{
            if(err) reject(createHttpError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })
}

module.exports = {
  randomDigitNumber,
  signAccessToken,
};