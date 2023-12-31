const Controller = require("../Controller");

class controller extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const couress = await this.models.CourseModel.find({}).sort({
        _id: -1,
      });
      return res.json({
        statusCode: 200,
        couress,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new controller(),
};
