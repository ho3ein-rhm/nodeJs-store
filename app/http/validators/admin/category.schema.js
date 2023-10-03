const joi = require("@hapi/joi");
const { mongodbRegex } = require("../../../utils/constants");

const categorySchema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error("دسته بندی وارد شده صحیح نیست!")),
  parent: joi
    .string()
    .allow("")
    .pattern(mongodbRegex)
    .error(new Error("شناسه دسته بندی صحیح نیست!")),
});
module.exports = {
  categorySchema,
};
