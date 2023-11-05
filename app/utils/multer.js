const multer = require("multer");
const path = require("path");
const fs = require("fs");
function craeteRoute() {
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
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = craeteRoute();
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    console.log(file.originalname);
    const fileName = String(new Date().getTime() + "_" + file.originalname);
    cb(null, fileName);
  },
});
const fileUpload = multer({ storage });
module.exports = {
  fileUpload,
};
