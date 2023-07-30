const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { SECRET_KEY } = require('../../utils/constants');
function verifyAcsessToken (req, res , next) {
    const headers = req.headers;
    const token = headers?.accesstoken || "";
    if(!token) return (next(createError.Unauthorized('وارد حساب  کاربری  خود شوید')))
    jwt.verify(token,SECRET_KEY ,(err , decode) => {
        if(err) return (next(createError.Unauthorized("خطایی  رخ داده است ")));
        console.log(decode);
        return next();
    })

}

module.exports =  {
    verifyAcsessToken
}