const redisClient = require("../utils/init-redis")
const { HomeRoute } = require('./api');
const { UserAuth } = require('./user/auth');

(async() =>{
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value)
})()


const router = require('express').Router();

router.use('/', HomeRoute);
router.use("/user", UserAuth);

module.exports = {
    Allrouters: router
}