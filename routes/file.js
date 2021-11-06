const router = require("express").Router();
const { uploadFile } = require("../controllers/file");
const upload = require("../utils/upload");
const { protect } = require("../middlewares/auth");

router.route("/upload").post(protect, upload.single("myFile"), uploadFile);
router.route("/download").get();

module.exports = router;
