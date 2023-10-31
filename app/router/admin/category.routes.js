const {
  categoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

router.post("/add", categoryController.addcategory);
router.get("/parent", categoryController.readparentCategory);
router.get("/children/:parent", categoryController.getChildrenCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
router.get("/all", categoryController.getAllCategorys);

module.exports = {
  categoryRoutes: router,
};
