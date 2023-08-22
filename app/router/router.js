const { HomeRoute } = require('./api');
const { UserAuth } = require('./user/auth');


const router = require('express').Router();

router.use('/', HomeRoute);
router.use("/user", UserAuth);

module.exports = {
    Allrouters: router
}