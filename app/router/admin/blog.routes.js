const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { fileUpload } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name : Blog-Routes
 */

router.post("/add", fileUpload.single("image"), AdminBlogController.addBlog);

/**
 * @swagger
 * /admin/blog/show:
 *  get:
 *      summary: category route
 *      tags: [Blog-Routes]
 *      description: get all data for  blogs
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description : not found
 *
 */

router.get("/show", AdminBlogController.showAllBlog);
router.post("/show-blog/:id", AdminBlogController.showBlogWithId);
router.patch(
  "/edit-blog/:id",
  fileUpload.single("image"),
  AdminBlogController.updateBlogById
);

module.exports = {
  blogRoutes: router,
};
