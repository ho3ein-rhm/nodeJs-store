const joi = require("@hapi/joi");

const authSchema = joi.object({
  phone: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره تلفن وارد شده صحیح نیست!")),
});
const checkCodeSchema = joi.object({
  phone: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره تلفن وارد شده صحیح نیست!")),
  code: joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نیست!"))
});
module.exports = {
  authSchema,
  checkCodeSchema,
};
