const { getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../Controller");
const path = require("path");
const { getTime } = require("../../../utils/functions");
const createHttpError = require("http-errors");
const { objectIdValidator } = require("../../validators/public.validator");

class episodeController extends Controller {
  async addepisode(req, res, next) {
    try {
      const {
        title,
        text,
        type,
        chapterID,
        courseID,
        fileUploadPath,
        fileName,
      } = await createEpisodeSchema.validateAsync(req.body);
      const videoAddress = path
        .join(fileUploadPath, fileName)
        .replace(/\\/g, "/");
      const videoURL = `${process.env.BASE_URL}:${process.env.APLICATION_PORT}/${videoAddress}`;
      const secends = await getVideoDurationInSeconds(videoURL);
      const time = getTime(secends);
      const episode = {
        title,
        text,
        type,
        videoAddress,
        time,
      };
      const createEpisode = await this.models.CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisode.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          "افزودن  ویدیو  انجام نشد  "
        );

      res.status(201).json({
        statusCode: "201",
        data: {
          message: "ویدیو  با  موفقیت  افزوده شد ",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeEpisode(req, res, next) {
    try {
      const { id } = req.params;
      const removeEpisode = await this.models.CourseModel.updateOne(
        { "chapters.episodes._id": id },
        {
          $pull: {
            "chapters.$.episodes": { _id: id },
          },
        }
      );
      if (removeEpisode.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          "حذف  ویدیو  انجام نشد  "
        );
      res.status(200).json({
        statusCode: "200",
        data: {
          message: "حذف  با  موفقیت  افزوده شد ",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateEpisode(req, res, next) {
    try {
      const {id : esisodeID} = await objectIdValidator(req.params);
      const {fileName , fileUploadPath} = req.body
      let blackListFields = ["_id"];
      if(fileName && fileUploadPath){
        const  fileAddress = path.join(fileUploadPath, fileName)
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoURL = `${process.env.BASE_URL}`
      }
      const time = getTime(secends);
      const episode = {
        title,
        text,
        type,
        videoAddress,
        time,
      };
      const createEpisode = await this.models.CourseModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisode.modifiedCount == 0)
        throw new createHttpError.InternalServerError(
          "افزودن  ویدیو  انجام نشد  "
        );

      res.status(201).json({
        statusCode: "201",
        data: {
          message: "ویدیو  با  موفقیت  افزوده شد ",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  episodeController: new episodeController(),
};
