const {
  verifyAcsessToken,
  checkRole,
} = require("../http/middlewares/verifyAcessToken");
const { graphqlConfig } = require("../utils/graphql.config");
const { adminRoutes } = require("./admin/admin.routes");
const { HomeRoute } = require("./api");
const { DeveloperRoutes } = require("./developer.router");
const { UserAuth } = require("./user/auth");
const { graphqlHTTP } = require("express-graphql");

const router = require("express").Router();

router.use("/", HomeRoute);
router.use("/user", UserAuth);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/admin", verifyAcsessToken, checkRole("ADMIN"), adminRoutes);
router.use("/developer", DeveloperRoutes);

module.exports = {
  Allrouters: router,
};
