import express from "express";
import { PostController } from "../controllers/post.controller.js";
import { CommentController } from "../controllers/comment.controller.js";
const router = express.Router();

router.get("/", CommentController.getComments);
router.post("/add-comment", CommentController.addComment);

export const CommentRouter = router;
