const router = require("express").Router();
const { uploadFile, showFiles, downloadFile } = require("../controllers/file");
const upload = require("../utils/upload");
const { protect } = require("../middlewares/auth");

router.route("/upload").post(protect, upload.single("myFile"), uploadFile);
router.route("/download/:file").get(protect, downloadFile);
router.route("/show").get(protect, showFiles);

module.exports = router;
