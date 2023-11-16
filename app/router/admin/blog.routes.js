const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { fileUpload } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", fileUpload.single("image"), AdminBlogController.addBlog);
router.get("/show", AdminBlogController.showAllBlog);

module.exports = {
  blogRoutes: router,
};
