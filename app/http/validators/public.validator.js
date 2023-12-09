const Joi = require("@hapi/joi");
const { mongodbRegex } = require("../../utils/constants");
const createHttpError = require("http-errors");

const objectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(mongodbRegex)
    .error(createHttpError.BadRequest("شناسه وارد شده شناسایی نشد ")),
});

module.exports = {
  objectIdValidator,
};
