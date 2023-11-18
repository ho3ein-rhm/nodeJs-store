const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { fileUpload } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", fileUpload.single("image"), AdminBlogController.addBlog);
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
