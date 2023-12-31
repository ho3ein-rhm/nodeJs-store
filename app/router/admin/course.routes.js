const {CourseController} = require("../../http/controllers/admin/courses.controller");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name : Courses-Routes
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
router.get("/all-courses" , CourseController.getAllCourses);

module.exports = {
  courseRoutes: router,
};
