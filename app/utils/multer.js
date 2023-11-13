const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
function craeteRoute(req) {
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
  console.log(req.body.fileUploadPath);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = craeteRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    const fileName = String(
      new Date().getTime() + "_" + file.originalname.replace(/\s/g, "")
    );
    req.body.fileName = fileName;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = file.mimetype;
  if (ext.includes("png", "jpeg", "jpg")) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("فرمت فایل صحیح نمیباشد"));
};
const fileUpload = multer({ storage, fileFilter });
module.exports = {
  fileUpload,
};
