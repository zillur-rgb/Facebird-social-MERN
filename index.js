import express from "express";

import usersRouter from "./routes/users.js";
import { AuthRouter } from "./routes/auth.route.js";
const app = express();

//Middlewares
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", AuthRouter);

app.listen(5000, () => console.log("API Working"));
