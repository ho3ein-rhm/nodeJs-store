const { HomeRoute } = require('./api');
const { DeveloperRoutes } = require('./developer.router');
const { UserAuth } = require('./user/auth');


const router = require('express').Router();

router.use('/', HomeRoute);
router.use("/user", UserAuth);
router.use("/developer", DeveloperRoutes);

module.exports = {
    Allrouters: router
}