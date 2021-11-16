const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".txt");
  },
});


const multerFilter = (req, file, cb) => {
  if (file.mimetype == "text/plain") {
    // checking the MIME type of the uploaded file
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
