const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongodbRegex } = require("../../../utils/constants");
const courseValidateSchema = Joi.object({
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
  fileName: Joi.string().error(
    createHttpError.BadRequest("نام فایل صحیح نمیباشد")
  ),
  Types: Joi.string()
    .regex(/(free|cash|special)/i)
    .error(createHttpError.BadRequest("نوع دوره به درستی  انتخاب  نشده است  ")),
  discount: Joi.allow(""),
  price: Joi.string()
    .min(4)
    .allow("0", "")
    .error(createHttpError.BadRequest("لطفعا مبلغ صحیح را  وارد  کنید")),
});

const createEpisodeSchema = Joi.object({
  title: Joi.string().error(createHttpError.BadRequest("عنوان صحیح نمی باشد ")),
  text: Joi.string().error(createHttpError.BadRequest("عنوان صحیح نمی باشد ")),
  type: Joi.string().regex(/(lock|unlock)/),
  chapterID: Joi.string()
    .pattern(mongodbRegex)
    .error(createHttpError.BadRequest("شناسه مورد نظر  صحیح  نمی باشد ")),
  courseID: Joi.string()
    .pattern(mongodbRegex)
    .error(createHttpError.BadRequest("شناسه مورد نظر  صحیح  نمی باشد ")),
  fileUploadPath: Joi.string().error(
    createHttpError.BadRequest("فرمت آدرس  صحیح نمیباشد")
  ),
  fileName: Joi.string().error(
    createHttpError.BadRequest("نام فایل صحیح نمیباشد")
  ),
});
module.exports = { courseValidateSchema , createEpisodeSchema};
