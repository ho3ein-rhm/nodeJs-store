const Controller = require("../Controller");

module.exports = new class HomeController extends Controller{
    index(req,res,next){
        return res.satus(200).send('index page')
    }
}