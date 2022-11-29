const homeController = require('../../http/controllers/api/home.controller');

const router = require('express').Router();
/**
 * @swagger
 * /:
 *  get:
 *      summary: index route
 *      tags: [index Page]
 *      description: get all data for  index page
 *      responses:
 *          200:
 *              description: success
 *          404: 
 *              description : not found
 * 
 */
router.get('/', homeController.index);

module.exports = {
    HomeRoute : router
}

