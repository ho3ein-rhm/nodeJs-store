const createHttpError = require("http-errors");
const { deleteFile } = require("../../../utils/functions");
const {
  courseValidateSchema,
} = require("../../validators/admin/course.schema");
const Controller = require("../Controller");
const path = require("path");
const { default: mongoose } = require("mongoose");

class controller extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const couress = await this.models.CourseModel.find({})
        .populate([
          { path: "category", select: { title: 1 } },
          {
            path: "teacher",
            select: { first_name: 1, last_name: 1, phone: 1, email: 1 },
          },
        ])
        .sort({
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
  async createCourses(req, res, next) {
    try {
      const { fileUploadPath, fileName } = req.body;
      const data = req.body;
      data.image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");
      await courseValidateSchema.validateAsync(req.body);
      data.teacher = req.user._id;
      data.time = "00:00:00";
      const course = await this.models.CourseModel.create(data);
      if (!course?._id)
        throw createHttpError.InternalServerError("دوره  ثبت نشد !");
      return res.status(200).json({
        message: "دوره با  موفقیت ثبت شد ",
        data,
      });
    } catch (error) {
      console.log(error);
      const { fileUploadPath, fileName } = req.body;
      deleteFile(path.join(fileUploadPath, fileName).replace(/\\/g, "/"));
      next(next);
    }
  }
  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await this.models.CourseModel.findById(id);
      return res.status(201).json({
        statusCode: 201,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async craeteChapter(req, res, next) {
    try {
      const { id, text, title } = req.body;
      await this.findCourseById(id);
      const coures = await this.models.CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );
      if (coures.modifiedCount == 0)
        throw createHttpError.InternalServerError("دوره افزوده نشد");
      res.status(201).json({
        statusCode: 201,
        message: "فصل با موفقیت افزوده شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async listChapterOfCourses(req, res, next) {
    try {
      const { id } = req.params;
      const chapter = await this.findChapterById(id);
      if (chapter.length == 0)
        return res
          .status(201)
          .json({ statusCode: 201, message: " سرفصل های  دوره خالی میباشد" });
      return res.status(201).json({ statusCode: 201, chapter });
    } catch (error) {
      next(error);
    }
  }
  async removeChapter(req, res, next) {
    try {
      const { id } = req.params;
      await this.getOneChapter(id);
      const chapterResult = await this.models.CourseModel.updateOne(
        {
          "chapters._id": id,
        },
        {
          $pull: {
            chapters: {
              _id: id,
            },
          },
        }
      );
      if (chapterResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError("حذف نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "فصل با موفقیت حذف شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateChapter(req, res, next) {
    try {
      const { id } = req.params;
      await this.getOneChapter(id);
      const data = req.body;
      let blackList = ["_id", "course"];
      let nullishData = ["", " ", "0", 0, null, undefined];
      console.log(data);
      Object.keys(data).forEach((key) => {
        if (blackList.includes(data[key])) delete data[key];
        if (nullishData.includes(data[key])) delete data[key];
        if (typeof data[key] == "string") data[key] == data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
      });
      console.log(data);
      const chapterResult = await this.models.CourseModel.updateOne(
        {
          "chapters._id": id,
        },
        {
          $set: {
            "chapters.$": data,
          },
        }
      );
      if (chapterResult.modifiedCount <= 0)
        throw new createHttpError.InternalServerError("ویرایش فصل  انجام نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "ویرایش با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async chapterOfCorses(req, res, next) {
    try {
      const { id } = req.params;
      const chapters = await this.getOneChapter(id);
      return res.status(201).json({
        statusCode: 201,
        data: {
          chapters,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.NotAcceptable("شناسه صحیح نمی باشد");
    const course = await this.models.CourseModel.findById(id);
    if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
    return course;
  }
  async findChapterById(id) {
    if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(id)))
      throw createHttpError.NotAcceptable("شناسه صحیح نمیباشد");
    const chapter = await this.models.CourseModel.findById(id, {
      chapters: 1,
      title: 1,
    });
    if (!chapter) throw createHttpError.NotFound("دوره پیدا نشد");
    return chapter;
  }
  async getOneChapter(id) {
    const chapter = await this.models.CourseModel.find(
      { "chapters._id": id },
      { "chapters.$": 1 }
    );
    if (!chapter) throw new Error(createHttpError.NotFound("سرفصل پیدا نشد"));
    return chapter;
  }
}

module.exports = {
  CourseController: new controller(),
};
