const {
  deleteFile,
  ListOfImageFromRequest,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");

const Controller = require("../Controller");
const { objectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");

class productController extends Controller {
  async addproduct(req, res, next) {
    try {
      req.body.images = ListOfImageFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const product = await createProductSchema.validateAsync(req.body);
      const { phone } = req.user;
      const user = await this.models.userModel.findOne({ phone });
      req.body.supplier = user.id;
      req.body.type = "virtual";
      if (
        +product.height !== 0 &&
        +product.weight !== 0 &&
        +product.width !== 0 &&
        +product.length !== 0
      ) {
        req.body.type = "physici";
        req.body.features = {
          height: product.height,
          weight: product.weight,
          width: product.width,
          length: product.length,
        };
      }
      const data = await this.models.ProductSchema.create(req.body);
      res.json({
        message: "محصول با موفقیت ثبت شد ",
        data: {
          data,
        },
      });
    } catch (error) {
      req.body?.images?.map((e) => deleteFile(e));
      next(error);
    }
  }
  async showProduct(req, res, next) {
    try {
      const products = await this.models.ProductSchema.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            localField: "supplier",
            foreignField: "_id",
            as: "supplier",
          },
        },
        { $unwind: "$supplier" },
      ]);
      return res.json({
        message: "find result",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductBySearch(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let product;
      if (search) {
        product = await this.models.ProductSchema.findOne({
          $text: {
            $search: search,
          },
        });
      } else {
        product = await this.models.ProductSchema.findOne({});
      }
      return res.status(201).json({ stasusCode: 201, data: { product } });
    } catch (error) {
      next(error);
    }
  }
  async getOneProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(200).json({
        statusCode: 200,
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeOneProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeResult = await this.models.ProductSchema.deleteOne({
        _id: product._id,
      });
      if (removeResult.deletedCount <= 0)
        throw createHttpError.InternalServerError("حذف انجام نشد ");
      return res.status(200).json({
        statusCode: 200,
        message: "محصول با موفقیت حذف شد ",
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productId) {
    const { id } = await objectIdValidator.validateAsync({ id: productId });
    const product = await this.models.ProductSchema.findById(id);
    if (!product) throw createHttpError.BadRequest("محصول یافت نشد ");
    return product;
  }
}

module.exports = {
  productController: new productController(),
};
