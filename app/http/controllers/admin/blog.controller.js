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
      req.body.images = image.replace(/\\/g, "/");
      const { phone } = req.user;
      const user = await this.models.userModel.findOne({ phone });
      req.body.author = user.id;
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
  async showAllBlog(req, res, next) {
    try {
      // const blogs = await this.models.blogModel
      //   .find({})
      //   .populate("author")
      //   .populate("category");
      const blogs = await this.models.blogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            "author.otp": 0,
            "author.bills": 0,
            "author.discount": 0,
            "author.roles": 0,
            "author.__v": 0,
          },
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $project: {
            "category.parent": 0,
            "category.__v": 0,
          },
        },
      ]);
      res.json({
        statusCode: 201,
        data: {
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteBlog(req, res, next) {}
  async showBlogWithId(req, res, next) {}
}

module.exports = {
  AdminBlogController: new BlogController(),
};
