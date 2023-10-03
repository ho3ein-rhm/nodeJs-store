const {
  categoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

router.post("/add", categoryController.addcategory);

module.exports = {
  categoryRoutes: router,
};
