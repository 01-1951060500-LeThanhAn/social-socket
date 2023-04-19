const mongoose = require("mongoose");
const SavePostSchema = new mongoose.Schema(
  {
    saveBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("favourite", SavePostSchema);
