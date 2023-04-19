const mongoose = require("mongoose");
const Comments = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
    likesComment: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("comments", Comments);
