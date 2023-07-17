const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/uploads`);
  },
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = file.file.filename;
  //   cb(null, uniqueSuffix);
  // },
});

const upload = multer({ storage });
module.exports = { upload };
