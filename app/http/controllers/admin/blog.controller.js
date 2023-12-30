const Controller = require("../Controller");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const path = require("path");
const { deleteFile } = require("../../../utils/functions");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");

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
  async showBlogWithId(req, res, next) {
    try {
      const blog_id = req.params.id;
      const blog = await this.models.blogModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(blog_id) } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        { $unwind: "$category" },
      ]);
      // const blog = await this.models.blogModel.findById(id);
      res.json({
        statusCode: 201,
        data: {
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.checkBlog(id);
      if (req?.body?.fileUploadPath && req?.body?.fileName) {
        const image = path.join(
          req?.body?.fileUploadPath + "/" + req?.body?.fileName
        );
        req.body.images = image.replace(/\\/g, "/");
        deleteFile(blog.images);
      }
      const data = req.body;
      console.log(req.body.fileName);
      let nullishData = ["", " ", "0", 0, null, undefined];
      let blackList = ["comments", "like", "deslike", "bookmark", "author"];
      Object.keys(data).forEach((key) => {
        if (blackList.includes(key)) delete data[key];
        if (nullishData.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] == data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
      });
      const updateResult = await this.models.blogModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if ((updateResult.modifiedCount = 0))
        throw createHttpError.InternalServerError("به روز رسانی انجام نشد");
      res.json({
        statusCode: 201,
        data: {
          message: "به روز رسانی با  موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFile(req.body.images);
      next(error);
    }
  }
  async checkBlog(id) {
    const blog = await this.models.blogModel.findById(id);
    if (!blog) return createHttpError.NotFound("مقاله ای پیدا نشد");
    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
