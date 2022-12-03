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

router.post("/login", UserAuthController.login);

module.exports = {
    UserAuth : router
}