const { episodeController } = require('../../http/controllers/admin/episodes');
const { fileUpload, videoUpload } = require('../../utils/multer');

const router =  require('express').Router();

/**
 * @swagger
 *  tags:
 *      name : Episode-Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *        Insert-episode:
 *            type: object
 *            required:
 *                -   title
 *                -   text
 *                -   courseID
 *                -   chapterID
 *                -   video
 *                -   type
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                text:
 *                    type: string
 *                    description: short text of product
 *                courseID:
 *                    type: string
 *                    example: 65a3aa16ddca43fb574a805f
 *                chapterID:
 *                    type: string
 *                    example : 65a3ad6dd4062ab3c0c7141a
 *                video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 *                type:
 *                    type: string
 *                    enum:
 *                        -   unlock
 *                        -   lock  
 */




/**
 * @swagger
 * /admin/episode/add:
 *  post:
 *      summery: craete courses
 *      tags: [Episode-Routes]
 *      description: creating the episode
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *                schema:
 *                    $ref: '#/components/schemas/Insert-episode'
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

router.post("/add",videoUpload.single('video'),episodeController.addepisode)
module.exports = {
    episodeRoutes : router
}