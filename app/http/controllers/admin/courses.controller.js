const { deleteFile } = require("../../../utils/functions");
const Controller = require("../Controller");
const path = require("path");

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
  async findCourseByText(req, res, next) {
    try {
      const text = req.query.search;
      const searchResult = await this.models.CourseModel.find({
        $text: { $search: text },
      });
      return res.status(200).json({
        statusCode: 200,
        searchResult,
      });
    } catch (error) {
      next(error);
    }
  }
  createCourses(req, res, next) {
    try {
      const { fileUploadPath, fileName } = req.body;
      const data = req.body;
      data.image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");
      return res.status(200).json({
        message: "succsefully",
        data,
      });
    } catch (error) {
      deleteFile(data.image);
      next(next);
    }
  }
}

module.exports = {
  CourseController: new controller(),
};
