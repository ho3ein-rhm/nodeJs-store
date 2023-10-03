const createHttpError = require("http-errors");
const { categorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../Controller");

class categoryController extends Controller {
  async addcategory(req, res, next) {
    try {
      console.log(req.body);
      await categorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      console.log(typeof parent);
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
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  categoryController: new categoryController(),
};
