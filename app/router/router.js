const { adminRoutes } = require("./admin/admin.routes");
const { HomeRoute } = require("./api");
const { DeveloperRoutes } = require("./developer.router");
const { UserAuth } = require("./user/auth");

const router = require("express").Router();

router.use("/", HomeRoute);
router.use("/user", UserAuth);
router.use("/admin", adminRoutes);
router.use("/developer", DeveloperRoutes);

module.exports = {
  Allrouters: router,
};
