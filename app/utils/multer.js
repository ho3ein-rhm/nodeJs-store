const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
function craeteRoute(req) {
  console.log("here 2.1");
  const date = new Date();
  const day = date.getDate().toString();
  const month = date.getMonth().toString();
  const year = date.getFullYear().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = craeteRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file?.originalname) {
      // const ext = path.extname(file.originalname);
      const fileName = String(
        new Date().getTime() + "_" + file.originalname.replace(/\s/g, "")
      );
      req.body.fileName = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = file.mimetype;
  if (ext.includes("png", "jpeg", "jpg")) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("فرمت فایل صحیح نمیباشد"));
};
const maxSize = 1 * 1000 * 1000;
const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});
module.exports = {
  fileUpload,
};
