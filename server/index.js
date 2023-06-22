import express from "express";

import usersRouter from "./routes/user.route.js";
import { AuthRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { postRouter } from "./routes/post.route.js";
import multer from "multer";
import { CommentRouter } from "./routes/comment.route.js";
import { LikeRouter } from "./routes/like.route.js";
const app = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Create the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    const file = req.file;
    res.status(200).json(file.filename);
  }
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", CommentRouter);
app.use("/api/v1/likes", LikeRouter);

app.listen(5000, () => console.log("API Working"));
