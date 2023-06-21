import express from "express";
import { UserController } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/test", UserController.getUser);

export default router;
