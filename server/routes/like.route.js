import express from "express";
import { LikeController } from "../controllers/like.controller.js";
const router = express.Router();

router.get("/", LikeController.getLikes);
router.post("/add-like", LikeController.addLike);
router.delete("/remove-like", LikeController.deleteLike);

export const LikeRouter = router;
