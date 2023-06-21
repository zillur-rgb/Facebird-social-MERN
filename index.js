import express from "express";

import usersRouter from "./routes/users.js";
import { AuthRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", AuthRouter);

app.listen(5000, () => console.log("API Working"));
