const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const db = require("./src/db/index");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoute");
const postRoutes = require("./src/routes/postRoute");
const commentRoutes = require("./src/routes/commentRoutes");
const messageRoutes = require("./src/routes/message");
const conversationRoutes = require("./src/routes/conversation");

dotenv.config();

db.connect();

app.use("/images", express.static(path.join(__dirname, "src/public/images")));
app.use("/videos", express.static(path.join(__dirname, "src/public/videos")));

app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(
  express.urlencoded({
    limit: "200mb",
    extended: true,
  })
);
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running! is ${PORT}`);
});
