import express from "express";
import { PostController } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", PostController.getPosts);

export const postRouter = router;
