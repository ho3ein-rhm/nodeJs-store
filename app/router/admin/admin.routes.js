const {blogRoutes} = require("./blog.routes");
const { categoryRoutes } = require("./category.routes");

const router = require("express").Router();
router.use("/category", categoryRoutes);
router.use("/blog", blogRoutes);
module.exports = {
  adminRoutes: router,
};
