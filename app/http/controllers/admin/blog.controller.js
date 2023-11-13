const Controller = require("../Controller");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const path = require("path");
const { log } = require("console");
const { deleteFile } = require("../../../utils/functions");

class BlogController extends Controller {
  async addBlog(req, res, next) {
    try {
      const blogValidate = await createBlogSchema.validateAsync(req.body);
      const image = path.join(
        blogValidate.fileUploadPath + "/" + blogValidate.fileName
      );
      req.body.image = image.replace(/\\/g, "/");
      const blog = await this.models.blogModel.create(req.body);
      return res.json({
        statusCode: 200,
        data: blog,
        message: "Craete successfully!",
      });
    } catch (error) {
      deleteFile(req.body.image);
      next(error);
    }
  }
  async showAllBlog(req, res, next) {}
  async deleteBlog(req, res, next) {}
  async showBlogWithId(req, res, next) {}
}

module.exports = {
  AdminBlogController: new BlogController(),
};
