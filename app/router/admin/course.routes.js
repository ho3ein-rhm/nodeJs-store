const {
  CourseController,
} = require("../../http/controllers/admin/courses.controller");
const { fileUpload } = require("../../utils/multer");
const episodeRoutes = require("./episode.routes");

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
 *  components:
 *    schemas:
 *        update-chapter:
 *            type: object
 *            properties:
 *                title:
 *                    type: string
 *                    description: tile of product
 *                text:
 *                    type: string
 *                    description: short text of product
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *        AddChapter:
 *            type: object
 *            required:
 *                -   id
 *                -   title
 *            properties:
 *                id:
 *                    type: string
 *                    description: the mongodb id
 *                title:
 *                    type: string
 *                    description: title of episodes
 *                text:
 *                    type: string
 *                    description: Description about episode
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
/**
 * @swagger
 * /admin/courses/show/{id}:
 *  post:
 *      summery: get course by id
 *      tags: [Courses-Routes]
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: find course By id
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

router.post("/show/:id", CourseController.getCourseById);

/**
 * @swagger
 * /admin/courses/add-episode:
 *  put:
 *      summery: craete chapter courses
 *      tags: [Courses-Routes]
 *      description: creating the curses
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *                schema:
 *                    $ref: '#/components/schemas/AddChapter'
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    $ref: '#/components/schemas/AddChapter'
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

router.put("/add-episode", CourseController.craeteChapter);

/**
 * @swagger
 *  /admin/courses/list-chapter-of-courses/{id}:
 *   get:
 *      summery: create chapter
 *      tags: [Courses-Routes]
 *      parameters:
 *        - in: path
 *          name: id
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
router.get(
  "/list-chapter-of-courses/:id",
  CourseController.listChapterOfCourses
);
/**
 * @swagger
 *  /admin/courses/chapter-of-courses/{id}:
 *   post:
 *      summery: search for chapter
 *      tags: [Courses-Routes]
 *      parameters:
 *        - in: path
 *          name: id
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
router.post("/chapter-of-courses/:id", CourseController.chapterOfCorses);

/**
 * @swagger
 *  /admin/courses/remove-chapter/{id}:
 *   delete:
 *      summery: remove chapter
 *      tags: [Courses-Routes]
 *      parameters:
 *        - in: path
 *          name: id
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
router.delete("/remove-chapter/:id", CourseController.removeChapter);

/**
 * @swagger
 *  /admin/courses/update-chapter/{id}:
 *   patch:
 *      summery: remove chapter
 *      tags: [Courses-Routes]
 *      parameters:
 *        - in: path
 *          name: id
 *      requestBody:
 *          content:
 *            application/x-www-form-urlencoded:
 *                schema:
 *                    $ref: '#/components/schemas/update-chapter'
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
router.patch("/update-chapter/:id", CourseController.updateChapter);


module.exports = {
  courseRoutes: router,
};
