const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Files", fileSchema);
