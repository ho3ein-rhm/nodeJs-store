const UserAuthController = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 *  components:
 *    schemas:
 *        GetOTP:
 *            type: object
 *            required:
 *                -   phone
 *            properties:
 *                phone:
 *                    type: string
 *                    description: them user  phone password
 *        checkOTP:
 *            type: object
 *            required:
 *                -   phone
 *                -   code
 *            properties:
 *                phone:
 *                    type: string
 *                    description: user phone for login
 *                code:
 *                   type: integer
 *                   description: reviced code getotp
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summery: login to user panel
 *      tags: [user auth]
 *      descripton: password(OTP) one time
 *      requestBody:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    $ref: '#/components/schemas/GetOTP'
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/GetOTP'
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    $ref: '#/components/schemas/checkOTP'
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/checkOTP'
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
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      summery: sign reftersh token
 *      tags: [user auth]
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
router.post("/check-otp", UserAuthController.checkCode);
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
  UserAuth: router,
};
