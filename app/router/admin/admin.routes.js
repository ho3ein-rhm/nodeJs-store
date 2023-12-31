const { blogRoutes } = require("./blog.routes");
const { categoryRoutes } = require("./category.routes");
const { courseRoutes } = require("./course.routes");
const { productRoutes } = require("./product.routes");

const router = require("express").Router();
router.use("/category", categoryRoutes);
router.use("/blog", blogRoutes);
router.use("/products", productRoutes);
router.use("/courses", courseRoutes);
module.exports = {
  adminRoutes: router,
};
