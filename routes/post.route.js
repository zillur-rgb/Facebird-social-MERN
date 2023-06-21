import express from "express";
import { PostController } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", PostController.getPosts);
router.post("/create-post", PostController.addPost);

export const postRouter = router;
