const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongodbRegex } = require("../../../utils/constants");
const createProductSchema = Joi.object({
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
  images: Joi.array()
    .allow()
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
  price: Joi.string().error(
    createHttpError.BadRequest("فرمت باید به صورت متن باشد")
  ),
  discount: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید تخفیفات")
  ),
  count: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید  تعداد")
  ),
  length: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید  تعداد")
  ),
  height: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید  تعداد")
  ),
  width: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید  تعداد")
  ),
  weight: Joi.string().error(
    createHttpError.BadRequest("لطفلا عدد وارد  کنید  تعداد")
  ),
});

module.exports = { createProductSchema };
