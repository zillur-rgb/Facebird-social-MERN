import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export const AuthRouter = router;
