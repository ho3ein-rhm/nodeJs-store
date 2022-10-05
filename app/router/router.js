const { HomeRoute } = require('./api');

const router = require('express').Router();

router.use('/',HomeRoute)

module.exports = {
    Allrouters: router
}