const Controller = require("../Controller");
const { createBlogSchema } = require("../../validators/admin/blog.schema");

class BlogController extends Controller {
  async addBlog(req, res, next) {
    try {
      const blogValidate = await createBlogSchema.validateAsync(req.body);
      return res.json(blogValidate);
    } catch (error) {
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
