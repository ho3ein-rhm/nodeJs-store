const joi = require("@hapi/joi");

const authSchema = joi.object({
  phone: joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره تلفن وارد شده صحیح نیست!"))
});

module.exports = {
  authSchema,
};
