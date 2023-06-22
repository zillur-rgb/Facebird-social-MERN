import express from "express";
import { UserController } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/:userId", UserController.getUser);

export default router;
