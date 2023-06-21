import express from "express";

import usersRouter from "./routes/users.js";
import { AuthRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { postRouter } from "./routes/post.route.js";
const app = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/posts", postRouter);

app.listen(5000, () => console.log("API Working"));
