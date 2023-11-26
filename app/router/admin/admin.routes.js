const { blogRoutes } = require("./blog.routes");
const { categoryRoutes } = require("./category.routes");
const { productRoutes } = require("./product.routes");

const router = require("express").Router();
router.use("/category", categoryRoutes);
router.use("/blog", blogRoutes);
router.use("/products", productRoutes);
module.exports = {
  adminRoutes: router,
};
