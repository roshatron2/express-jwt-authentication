const asyncHandler = require("../middlewares/asyncHandler");
const File = require("../models/File");
const User = require("../models/User");
const upload = require("../utils/upload");
const jwt = require("jsonwebtoken");

exports.uploadFile = asyncHandler(async (req, res, next) => {
  const { filename } = req.body;
  const { path } = req.file;

  let file = await File.create({ name: filename });
  if (!file) {
    return next({
      message: "There was an error while creating the file",
      statusCode: 400,
    });
  }

  let userId = req.user._id;
  let user = await User.findByIdAndUpdate(userId, {
    $push: {
      files: file._id,
    },
  });
  res.json({
    sucess: true,
  });
});
exports.downloadFile = asyncHandler(async (req, res, next) => {});
