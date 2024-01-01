const {
  CourseController,
} = require("../../http/controllers/admin/courses.controller");
const { fileUpload } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name : Courses-Routes
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *            type: string
 *            enum:
 *                - free
 *                - cash
 *                - special
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *        Insert-course:
 *            type: object
 *            required:
 *                -   title
 *                -   short_text
 *                -   text
 *                -   image
 *                -   tags
 *                -   category
 *                -   price
 *                -   Types
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                short_text:
 *                    type: string
 *                    description: short text of product
 *                text:
 *                    type: string
 *                    description: short text of product
 *                image :
 *                    type: string
 *                    format: binary
 *                    description: images of the product
 *                tags:
 *                    type: array
 *                    description: tags of the product
 *                category:
 *                    type: string
 *                    description: category of the product
 *                price:
 *                    type: number
 *                    description: price of the product
 *                discount:
 *                    type: number
 *                    description: discount of the product
 *                Types:
 *                    $ref: '#/components/schemas/Types'
 */

/**
 * @swagger
 * /admin/courses/all-courses:
 *  get:
 *      summery: show all of your courses
 *      tags: [Courses-Routes]
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
router.get("/all-courses", CourseController.getAllCourses);

/**
 * @swagger
 * /admin/courses/search-course:
 *  post:
 *      summery: search all of your courses
 *      tags: [Courses-Routes]
 *      parameters:
 *          -   in: query
 *              type: text
 *              name: search
 *              descripton: type a text u wana search
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
router.post("/search-course", CourseController.findCourseByText);

/**
 * @swagger
 * /admin/courses/add-course:
 *  post:
 *      summery: craete courses
 *      tags: [Courses-Routes]
 *      description: creating the curses
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *                schema:
 *                    $ref: '#/components/schemas/Insert-course'
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
router.post(
  "/add-course",
  fileUpload.single("image"),
  CourseController.createCourses
);
module.exports = {
  courseRoutes: router,
};
