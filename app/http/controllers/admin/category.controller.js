const createHttpError = require("http-errors");
const { categorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../Controller");

class categoryController extends Controller {
  async addcategory(req, res, next) {
    try {
      console.log(req.body);
      await categorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await this.models.categoryModel.create({
        title,
        parent,
      });
      if (!category) throw createHttpError.InternalServerError("خطای داخلی!");
      res.status(201).json({
        satusCode: 201,
        message: "creation succesfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async readparentCategory(req, res, next) {
    try {
      this.models.categoryModel.find({ parent: undefined }, (err, category) => {
        if (err)
          throw createHttpError.InternalServerError("داده ای  پیدا نشد!");
        return res.json({
          data: {
            category,
          },
          statusCode: 200,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getChildrenCategory(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await this.models.categoryModel.find({ parent });
      if (Object.keys(children).length == 0)
        throw createHttpError.NotFound("دسته بندی پیدا نشد");
      res.status(200).json({
        data: {
          type: typeof children,
          children,
        },
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deletedcategory = await this.models.categoryModel.deleteOne({
        _id: category._id,
      });
      if (deletedcategory.deletedCount == 0)
        throw createHttpError.InternalServerError("خطایی رخ داده است ");
      res.status(200).json({
        message: "دسته بندی با  موفقیت حذف شد",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id) {
    const category = await this.models.categoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("داده ای  پیدا نشد ");
    return category;
  }
  async getAllCategorys(req, res, next) {
    try {
      const category = await this.models.categoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.parent": 0,
            "children.__v": 0,
          },
        },
      ]);
      res.status(200).json({
        data: {
          category,
        },
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  categoryController: new categoryController(),
};
