const { getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../Controller");
const path = require("path");
const { getTime } = require("../../../utils/functions");

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
      const videoAdress = path
        .join(fileUploadPath, fileName)
        .replace(/\\/g, "/");
      const videoURL = `${process.env.BASE_URL}:${process.env.APLICATION_PORT}/${videoAdress}`;
      console.log(videoURL);
      const secends = await getVideoDurationInSeconds(videoURL);
      const time = getTime(secends);
      res.json({
        title,
        text,
        type,
        chapterID,
        courseID,
        fileUploadPath,
        fileName,
        time,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  episodeController: new episodeController(),
};
