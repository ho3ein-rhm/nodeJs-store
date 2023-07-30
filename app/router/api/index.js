const homeController = require('../../http/controllers/api/home.controller');
const {verifyAcsessToken} = require('../../http/middlewares/verifyAcessToken');

const router = require('express').Router();
/**
 * @swagger
 * /:
 *  get:
 *      summary: index route
 *      tags: [index Page]
 *      description: get all data for  index page
 *      parameters:
 *          -   in: header
 *              name: accessToken
 *              example: Token...
 *      responses:
 *          200:
 *              description: success
 *          404: 
 *              description : not found
 * 
 */
router.get("/", verifyAcsessToken, homeController.index);

module.exports = {
    HomeRoute : router
}

