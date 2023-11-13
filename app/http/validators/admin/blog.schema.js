const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongodbRegex } = require("../../../utils/constants");
const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد ")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحصح نمی باشد")
  ),
  image: Joi.string()
    .pattern(/(\.png|\.jpeg|\.jpg)$/)
    .error(createHttpError.BadRequest("تصاویر ارسال شده صحیح نمی باشد")),
  tags: Joi.string()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسپ ها نمی توانند بیشتر از  20 آیتم باشند")
    ),
  category: Joi.string()
    .pattern(mongodbRegex)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر  یافت نشد")),
  fileUploadPath: Joi.string().error(
    createHttpError.BadRequest("فرمت آدرس  صحیح نمیباشد")
  ),
  fileName: Joi.string().error(createHttpError.BadRequest("نام فایل صحیح نمیباشد")),
});

module.exports = { createBlogSchema };
