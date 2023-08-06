const UserAuthController = require("../../http/controllers/user/auth/auth.controller")

const router = require("express").Router();
/**
 * @swagger
 * /user/login:
 *  post:
 *      summery: login to user panel
 *      tags: [user auth]
 *      descripton: password(OTP) one time 
 *      parameters:
 *      -   name: phone
 *          description: fa-IRI phonenumber
 *          in: formData
 *          required: true
 *          type: string
 *      responses: 
 *          201:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500: 
 *              description: Internal Server Error  
 * 
 */

/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      summery: check Otp code 
 *      tags: [user auth]
 *      description: final opration for login
 *      parameters:
 *      -   name: phone
 *          description: fa-IRI phonenumber
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: code 
 *          description: one time password
 *          in: formData
 *          required: true
 *          type: string
 *      responses: 
 *          201:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthrorization
 *          500: 
 *              description: Internal Server Error  
 */
router.post("/login", UserAuthController.getOtp);
router.post("/check-otp", UserAuthController.checkCode);
/**
 * @swagger
 * /user/refresh-token:
 *  post: 
 *      summery: sign reftersh token
 *      parameters:
 *      -       in: formData
 *              required: true
 *              type: string
 *              name: refreshToken
 *      responses:
 *          200:
 *              description: success
 *      
 */
router.post("/refresh-token", UserAuthController.refreshToken)

module.exports = {
    UserAuth : router
}