const asyncHandler = require("../middlewares/asyncHandler");
const File = require("../models/File");
const User = require("../models/User");
const upload = require("../utils/upload");
const { encrypt, deleteFile, decrypt } = require("../utils/encrypt");

exports.uploadFile = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  let { path, filename } = req.file;
  path += ".enc";
  console.log(req.file);

  let file = await File.create({ name, path });
  if (!file) {
    return next({
      message: "There was an error while creating the file",
      statusCode: 400,
    });
  }

  encrypt("D:\\Projects\\Web\\JWT-Authentication\\uploads", filename);
  deleteFile("D:\\Projects\\Web\\JWT-Authentication\\uploads", filename);

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
exports.downloadFile = asyncHandler(async (req, res, next) => {
  let fileId = req.params.file;
  let { path, name } = await File.findById(fileId);
  res.download(path, name);
});
exports.showFiles = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  let { files } = await User.findById(_id);

  res.status(200).json({
    success: true,
    data: { files },
  });
});
